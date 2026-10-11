
import dns from "node:dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]);
import "dotenv/config";
import mongoose from "mongoose";
import Product from "./models/Product.js";

const productsToAdd = [
  {
    name: "SoundX Premium Headphones",
    brand: "SoundX",
    price: 12999,
    description: "Premium headphones designed for clear sound and everyday comfort.",
    image: "https://placehold.co/600x400?text=SoundX+Premium",
    category: "Headphones",
    stock: 10,
    featured: true,
  },
  {
    name: "JBL Tune 760NC",
    brand: "JBL",
    price: 18999,
    description: "Wireless headphones with noise cancelling and powerful sound.",
    image: "https://placehold.co/600x400?text=JBL+Tune+760NC",
    category: "Headphones",
    stock: 10,
    featured: true,
  },
  {
    name: "Anker Soundcore Q20i",
    brand: "Anker",
    price: 14999,
    description: "Wireless over-ear headphones for immersive everyday listening.",
    image: "https://placehold.co/600x400?text=Soundcore+Q20i",
    category: "Headphones",
    stock: 10,
    featured: false,
  },
  {
    name: "Bose QuietComfort",
    brand: "Bose",
    price: 69999,
    description: "Comfortable wireless headphones with noise cancellation.",
    image: "https://placehold.co/600x400?text=Bose+QuietComfort",
    category: "Headphones",
    stock: 5,
    featured: true,
  },
  {
    name: "Sony WH-CH720N",
    brand: "Sony",
    price: 29999,
    description: "Lightweight wireless headphones with noise cancelling.",
    image: "https://placehold.co/600x400?text=Sony+CH720N",
    category: "Headphones",
    stock: 8,
    featured: false,
  },
];

async function seedProducts() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI not found in backend/.env");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected!");

    for (const productData of productsToAdd) {
      const existingProduct = await Product.findOne({
        name: productData.name,
      });

      if (existingProduct) {
        console.log(`Already exists, skipped: ${productData.name}`);
        continue;
      }

      const product = await Product.create(productData);

      console.log(`Added: ${product.name} | ID: ${product._id}`);
    }

    const totalProducts = await Product.countDocuments();
    console.log(`Total products in database: ${totalProducts}`);
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedProducts();