import express from "express";
import {
  adminLogin,
  loginUser,
  registerUser,
} from "../controllers/userControllers.js";
import { asyncWrapper } from "../middleware/asyncWrapper.js";
import { validateLogin, validateRegister } from "../middleware/validator.js";

const userRouter = express.Router();

userRouter.post("/register", validateRegister, asyncWrapper(registerUser));
userRouter.post("/login", validateLogin, asyncWrapper(loginUser));

userRouter.post("/admin/login", validateLogin, asyncWrapper(adminLogin));

export default userRouter;
