import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
} from "../controllers/productsControllers.js";
import { uploadMiddleware } from "../middleware/multer.js";
import { adminAuth } from "../middleware/adminAuth.js";

const productsRouter = express.Router();

productsRouter
  .route("/")
  .get(getAllProducts)
  .post(adminAuth, uploadMiddleware, createProduct);

productsRouter
  .route("/:id")
  .get(getSingleProduct)
  .delete(adminAuth, deleteProduct);

export default productsRouter;
