import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoutes.js";
import userRouter from "./routes/usersRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";
import orderRouter from "./routes/orderRoutes.js";

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/v1/food", foodRouter);

app.use("/api/v1/user", userRouter);

app.use("/api/v1/cart", authMiddleware, cartRouter);

app.use("/api/v1/order", orderRouter);

// app.use("/images", express.static("uploads"));

app.get("/", (req, res) => res.json({ success: true }));

app.listen(port, () => console.log(`=> server listening on port ${port}...`));
