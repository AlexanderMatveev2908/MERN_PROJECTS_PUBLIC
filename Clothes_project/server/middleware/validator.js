import { check, validationResult } from "express-validator";
import { REG_NAME, REG_PASSWORD } from "../constants/regex.js";

export const validateRegister = [
  check("name")
    .matches(REG_NAME)
    .withMessage("Name must be between 2 and 40 chars, no special chars"),

  check("email").isEmail().withMessage("Provide a valid email"),

  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 chars")
    .matches(REG_PASSWORD)
    .withMessage(
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special char"
    ),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateLogin = [
  check("email").isEmail().withMessage("Provide a valid email"),

  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 chars"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array(), success: false });
    }
    next();
  },
];
