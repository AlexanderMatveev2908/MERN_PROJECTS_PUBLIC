import UserModel from "../models/UserModel.js";
import { updateCartItem } from "../utils/updateCartItem.js";

const getUserCart = async (req, res) => {
  const { userId } = req.user;
  try {
    const { cartData: userCart } = await UserModel.findById(userId);

    return res.status(200).json({ ok: true, userCart });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const updateCart = async (req, res) => {
  const { userId } = req.user;
  const { itemId, action } = req.body;

  if (!itemId || !action)
    return res.status(400).json({ message: "=> Item ID is required" });

  try {
    const user = await UserModel.findById(userId);

    const { cartData: userCart } = user;

    updateCartItem(itemId, action, userCart);

    user.markModified("cartData");
    await user.save();

    return res.status(200).json({ ok: true, userCart });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export { getUserCart, updateCart };

``;
