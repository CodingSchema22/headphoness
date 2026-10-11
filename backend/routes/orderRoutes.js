
import express from "express";
import mongoose from "mongoose";
import { randomUUID } from "node:crypto";

import Order from "../models/Order.js";
import Product from "../models/Product.js";

const router = express.Router();

const FREE_SHIPPING_LIMIT = 15000;
const SHIPPING_FEE = 500;

// CREATE ORDER
router.post("/", async (req, res) => {
  try {
    const { customer, items, paymentMethod } = req.body;

    // Validate customer details
    if (
      !customer?.name?.trim() ||
      !customer?.email?.trim() ||
      !customer?.phone?.trim() ||
      !customer?.address?.trim() ||
      !customer?.city?.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required customer details.",
      });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Your cart is empty.",
      });
    }

    if (paymentMethod && paymentMethod !== "Cash on Delivery") {
      return res.status(400).json({
        success: false,
        message:
          "Online card payments are not configured yet. Please select Cash on Delivery.",
      });
    }

    // Validate product IDs and quantities
    const quantities = new Map();

    for (const item of items) {
      const rawId = item?.productId || item?.id || item?._id;

      // Safely extract an ID if it was supplied as an object
      const productId =
        rawId && typeof rawId === "object"
          ? rawId._id || rawId.id
          : rawId;

      const quantity = Number(item?.quantity);

      if (
        typeof productId !== "string" ||
        !mongoose.isValidObjectId(productId) ||
        !Number.isInteger(quantity) ||
        quantity < 1 ||
        quantity > 20
      ) {
        console.error("Invalid order item received:", {
          productId,
          quantity,
          item,
        });

        return res.status(400).json({
          success: false,
          message:
            "Invalid product ID or quantity. Please remove the product from your cart and add it again.",
        });
      }

      const normalizedId = productId.toString();

      quantities.set(
        normalizedId,
        (quantities.get(normalizedId) || 0) + quantity
      );
    }

    const productIds = [...quantities.keys()];

    if (productIds.some((id) => quantities.get(id) > 20)) {
      return res.status(400).json({
        success: false,
        message: "Maximum quantity per product is 20.",
      });
    }

    // Fetch the real products from MongoDB
    const products = await Product.find({
      _id: { $in: productIds },
    });

    if (products.length !== productIds.length) {
      return res.status(400).json({
        success: false,
        message:
          "One or more products could not be found in the database. Please remove them from your cart and add them again.",
      });
    }

    const productMap = new Map(
      products.map((product) => [
        product._id.toString(),
        product,
      ])
    );

    let subtotal = 0;
    const orderItems = [];

    for (const [productId, quantity] of quantities) {
      const product = productMap.get(productId);

      if (!product) {
        return res.status(400).json({
          success: false,
          message: "Product not found. Please refresh your cart.",
        });
      }

      if (
        !Number.isFinite(Number(product.stock)) ||
        Number(product.stock) < quantity
      ) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${product.name}.`,
        });
      }

      const price = Number(product.price);

      if (!Number.isFinite(price) || price < 0) {
        return res.status(400).json({
          success: false,
          message: `Invalid price for ${product.name}.`,
        });
      }

      subtotal += price * quantity;

      orderItems.push({
        product: product._id,
        name: product.name,
        image: product.image || "",
        price,
        quantity,
        selectedColor: null,
      });
    }

    subtotal = Number(subtotal.toFixed(2));

    const shipping =
      subtotal >= FREE_SHIPPING_LIMIT ? 0 : SHIPPING_FEE;

    const total = Number((subtotal + shipping).toFixed(2));

    // Reserve stock and restore it if order creation fails
    const reserved = [];

    try {
      for (const item of orderItems) {
        const result = await Product.updateOne(
          {
            _id: item.product,
            stock: { $gte: item.quantity },
          },
          {
            $inc: { stock: -item.quantity },
          }
        );

        if (result.modifiedCount !== 1) {
          throw new Error(
            `Insufficient stock for ${item.name}. Please try again.`
          );
        }

        reserved.push(item);
      }

      const order = await Order.create({
        orderNumber: `SX-${randomUUID()}`,
        customer: {
          name: customer.name.trim(),
          email: customer.email.trim().toLowerCase(),
          phone: customer.phone.trim(),
          address: customer.address.trim(),
          city: customer.city.trim(),
          postalCode: customer.postalCode?.trim() || "",
        },
        items: orderItems,
        currency: "PKR",
        subtotal,
        shipping,
        total,
        paymentMethod: "Cash on Delivery",
        paymentStatus: "Pending",
        status: "Processing",
      });

      return res.status(201).json({
        success: true,
        message: "Order placed successfully.",
        order,
      });
    } catch (error) {
      await Promise.all(
        reserved.map((item) =>
          Product.updateOne(
            { _id: item.product },
            { $inc: { stock: item.quantity } }
          )
        )
      );

      throw error;
    }
  } catch (error) {
    console.error("Create order error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Unable to place order.",
    });
  }
});

export default router;