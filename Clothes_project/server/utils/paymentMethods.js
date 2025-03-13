import Order from "../models/Order.js";
import User from "../models/User.js";
import Stripe from "stripe";
import { getDeliveryFee } from "./delivery.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const placeOrderByCod = async (userOrder, res) => {
  await Order.create({ ...userOrder, userId: userOrder.user });
  await User.findByIdAndUpdate(userOrder.user, { cartData: {} });

  return res
    .status(200)
    .json({ success: true, msg: "Order Placed Successfully" });
};

export const placeOrderByStripe = async (req, userOrder, res) => {
  const { origin } = req.headers;

  try {
    const newOrder = await Order.create({
      ...userOrder,
      userId: userOrder.user,
    });

    const line_items = userOrder.items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.qty,
    }));

    line_items.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Delivery Fee",
        },
        unit_amount: getDeliveryFee(userOrder.amount) * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: "payment",
    });

    return res.status(200).json({ success: true, session_url: session.url });
  } catch (err) {
    if (newOrder) await Order.findByIdAndDelete(newOrder._id);

    return res.status(500).json({ msg: err.message, success: false });
  }
};

export const placeOrderByRazorpay = async (userOrder, res) => {
  return res.status(200).json({ success: true, userOrder });
};
