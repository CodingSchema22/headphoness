// import dns from "node:dns";

// dns.setServers(["8.8.8.8", "1.1.1.1"]);

// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import mongoose from "mongoose";

// import productRoutes from "./routes/productRoutes.js";
// import orderRoutes from "./routes/orderRoutes.js";

// dotenv.config();

// const app = express();

// app.use(
//   cors({
//     origin: process.env.CLIENT_URL || "http://localhost:5173",
//   })
// );

// app.use(express.json());

// app.get("/", (req, res) => {
//   res.json({
//     success: true,
//     message: "Headphone Store Backend is running!",
//   });
// });

// app.use("/api/products", productRoutes);
// app.use("/api/orders", orderRoutes);

// const PORT = process.env.PORT || 5000;

// async function startServer() {
//   try {
//     if (!process.env.MONGO_URI) {
//       throw new Error("MONGO_URI missing in backend/.env file");
//     }

//     console.log("Connecting to MongoDB...");

//     await mongoose.connect(process.env.MONGO_URI, {
//       serverSelectionTimeoutMS: 10000,
//     });

//     console.log("MongoDB connected successfully!");

//     app.listen(PORT, () => {
//       console.log(`Backend running at http://localhost:${PORT}`);
//     });
//   } catch (error) {
//     console.error("MongoDB connection error:", error.message);
//     process.exit(1);
//   }
// }

// startServer();

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();

const app = express();

// app.use(
//   cors({
//     origin: process.env.CLIENT_URL || "http://localhost:5173",
//   })
// );



const allowedOrigins = [
  "http://localhost:5173",
  "https://headphoness-gold.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
  })
);


app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Headphone Store Backend is running!",
  });
});

// Reuse the MongoDB connection when possible
let mongoConnectionPromise;

async function connectToDatabase() {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI environment variable is missing");
  }

  if (!mongoConnectionPromise) {
    mongoConnectionPromise = mongoose
      .connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 10000,
      })
      .catch((error) => {
        mongoConnectionPromise = null;
        throw error;
      });
  }

  await mongoConnectionPromise;
}

// Connect before handling API requests
app.use(async (req, res, next) => {
  try {
    await connectToDatabase();
    next();
  } catch (error) {
    console.error("MongoDB connection error:", error.message);

    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
});

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

export default app;
