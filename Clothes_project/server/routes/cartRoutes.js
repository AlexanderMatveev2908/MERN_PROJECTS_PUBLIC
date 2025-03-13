import express from "express";
import { getUserCart, updateCart } from "../controllers/cartControllers.js";
import { userAuth } from "./../middleware/userAuth.js";

const cartRouter = express.Router();

cartRouter.route("/").get(userAuth, getUserCart).patch(userAuth, updateCart);

export default cartRouter;
