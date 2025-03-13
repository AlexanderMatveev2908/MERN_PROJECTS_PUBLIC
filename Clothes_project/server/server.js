import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/mongoDB.js";
import { connectCloudinary } from "./config/cloudinary.js";
import { errorMiddleware } from "./middleware/errorMiddleware.js";
import userRouter from "./routes/userRoutes.js";
import productsRouter from "./routes/productsRoutes.js";
import path from "path";
import cartRouter from "./routes/cartRoutes.js";
import ordersRouter from "./routes/ordersRoutes.js";

const port = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  "/uploads",
  express.static((path.dirname(new URL(import.meta.url).pathname), "uploads"))
);

app.use((req, res, next) => {
  req.setTimeout(60000);
  res.setTimeout(60000);
  next();
});

app.use("/api/v1/clothes/user", userRouter);
app.use("/api/v1/clothes/products", productsRouter);
app.use("/api/v1/clothes/cart", cartRouter);
app.use("/api/v1/clothes/orders", ordersRouter);

app.use(errorMiddleware);

const start = async () => {
  try {
    await connectDB();
    await connectCloudinary();
    app.listen(port, () => console.log(`=> server running on ${port}...`));
  } catch (err) {
    console.dir(err);
  }
};

start();
