import express from "express";
import { getUserCart, updateCart } from "../controllers/cartControllers.js";

const router = express.Router();

router.get("/", getUserCart);
router.patch("/", updateCart);

export default router;
