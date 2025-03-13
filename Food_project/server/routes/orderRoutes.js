import express from "express";
import {
  getAllOrders,
  getOrder,
  getOrders,
  placeOrder,
  updateOrder,
  verifyOrder,
} from "../controllers/orderControllers.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, placeOrder);
router.post("/verify", authMiddleware, verifyOrder);
router.get("/", authMiddleware, getOrders);

router.get("/list", getAllOrders);
router.patch("/:orderId", updateOrder);
router.get("/:orderId", getOrder);

export default router;
