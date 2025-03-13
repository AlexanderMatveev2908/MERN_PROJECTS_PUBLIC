import Order from "../models/Order.js";
import User from "../models/User.js";
import {
  placeOrderByCod,
  placeOrderByRazorpay,
  placeOrderByStripe,
} from "../utils/paymentMethods.js";

export const placeOrder = async (req, res) => {
  const { items, address, amount, paymentMethod, user } = req.body;

  if (
    ![amount, paymentMethod].every((el) => !!el) ||
    !Object.values(address ?? {}).every((el) => !!el) ||
    !items?.length
  )
    return res.status(400).json({ message: "Invalid request" });

  const userOrder = { paymentMethod, user, items, amount, address };

  try {
    switch (paymentMethod) {
      case "cod":
        await placeOrderByCod(userOrder, res);
        break;

      case "stripe":
        await placeOrderByStripe(req, userOrder, res);
        break;

      case "razorpay":
        await placeOrderByRazorpay(userOrder, res);
        break;

      default:
        return res.status(400).json({ msg: "Invalid payment method" });
    }
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

export const getOrdersUser = async (req, res) => {
  const { user } = req.body;

  const orders = await Order.find({ userId: user });

  return res.status(200).json({ success: true, orders });
};

export const getAllOrdersAdminOnly = async (req, res) => {
  const orders = await Order.find({});

  return res.status(200).json({ success: true, orders });
};

export const updateStatusOrderAdminOnly = async (req, res) => {
  const { orderId, status } = req.body;

  const order = await Order.findByIdAndUpdate(
    orderId,
    { status },
    { new: true }
  );

  return res
    .status(200)
    .json({ success: true, msg: "Status updated successfully" });
};

export const verifyStripe = async (req, res) => {
  const { orderId, success } = req.query;
  const { user } = req.body;

  if (!orderId || !success)
    return res.status(400).json({ msg: "Invalid request" });

  const { cartData: oldCart } = await User.findById(user);

  try {
    if (success) {
      await Order.findByIdAndUpdate(orderId, { isPaid: true });

      await User.findByIdAndUpdate(user, { cartData: {} });

      return res
        .status(200)
        .json({ success: true, msg: "Payment verified successfully" });
    } else {
      await Order.findByIdAndDelete(orderId);
      await User.findByIdAndUpdate(user, { cartData: oldCart });

      return res.status(200).json({ success: false, msg: "Payment failed" });
    }
  } catch (err) {
    await Order.findByIdAndDelete(orderId);
    await User.findByIdAndUpdate(user, { cartData: oldCart });

    return res.status(500).json({ msg: err.message });
  }
};
