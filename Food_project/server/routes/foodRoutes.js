import express from "express";
import { uploadImg } from "../middleware/uploadMiddleware.js";
import {
  addFood,
  getFoodList,
  removeFood,
} from "../controllers/foodControllers.js";

const router = express.Router();

router.get("/", getFoodList);

router.post("/", uploadImg.single("image"), addFood);

router.delete("/:id", removeFood);

export default router;
