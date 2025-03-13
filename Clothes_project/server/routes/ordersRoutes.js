import express from "express";
import {
  getAllOrdersAdminOnly,
  getOrdersUser,
  placeOrder,
  updateStatusOrderAdminOnly,
  verifyStripe,
} from "../controllers/ordersControllers.js";
import { adminAuth } from "../middleware/adminAuth.js";
import { userAuth } from "./../middleware/userAuth.js";

const ordersRouter = express.Router();

ordersRouter
  .route("/admin")
  .get(adminAuth, getAllOrdersAdminOnly)
  .patch(adminAuth, updateStatusOrderAdminOnly);

ordersRouter
  .route("/user")
  .get(userAuth, getOrdersUser)
  .post(userAuth, placeOrder);

ordersRouter.post("/user/verify_stripe", userAuth, verifyStripe);

export default ordersRouter;
