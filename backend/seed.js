import dns from "node:dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]);
import dotenv from "dotenv";
import mongoose from "mongoose";
import Product from "./models/Product.js";

dotenv.config();

async function seedProduct() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const product = await Product.create({
      name: "Sony WH-1000XM5",
      brand: "Sony",
      price: 79999,
      description: "Premium wireless headphones with noise cancellation.",
      image: "https://placehold.co/600x400?text=Sony+Headphones",
      category: "Headphones",
      stock: 10,
      featured: true,
    });

    console.log("Product added successfully:", product);
  } catch (error) {
    console.error("Error adding product:", error.message);
  } finally {
    await mongoose.disconnect();
  }
}

seedProduct();