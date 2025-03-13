import User from "../models/User.js";
import { makeUpdateLogic } from "./../utils/updateCart.js";

export const getUserCart = async (req, res) => {
  const { user } = req.body;

  const { cartData } = await User.findById(user);

  return res.status(200).json({ cartData, success: true });
};

export const updateCart = async (req, res) => {
  const { itemId, itemSize, action, user, qty } = req.body;

  if (![itemId, itemSize, action, user].every((el) => !!el))
    return res.status(400).json({ msg: "Invalid request", success: false });
  if (action === "UPDATE_QTY" && !qty)
    return res
      .status(400)
      .json({ msg: "Quantity is required", success: false });

  const existingUser = await User.findById(user);

  const updatedCart = makeUpdateLogic(
    { ...existingUser.cartData },
    itemId,
    itemSize,
    action,
    qty
  );

  existingUser.cartData = updatedCart;
  await existingUser.save();

  return res.status(200).json({ updatedCart, success: true });
};
