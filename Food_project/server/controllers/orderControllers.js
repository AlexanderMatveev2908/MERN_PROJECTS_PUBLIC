import OrderModel from "../models/OrderModel.js";
import UserModel from "../models/UserModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET);

const placeOrder = async (req, res) => {
  const { userId } = req.user;

  const { items, amount, address } = req.body;

  if (![items, amount, address].every(Boolean))
    return res.status(400).json({ message: "=> All fields are required" });

  const frontendUrl = "http://localhost:5173";

  try {
    const newOrder = await OrderModel.create({
      userId,
      items,
      amount,
      address,
    });

    await UserModel.findByIdAndUpdate(userId, { cartData: {} });

    const line_items = items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: Number((item.price * 100).toFixed(2)),
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "delivery charge",
        },
        unit_amount: 10 * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${frontendUrl}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontendUrl}/verify?success=false&orderId=${newOrder._id}`,
    });

    return res.status(201).json({
      message: "Order placed successfully",
      session_url: session.url,
      ok: true,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success === "true") {
      await OrderModel.findByIdAndUpdate(orderId, { payment: true });

      return res
        .status(200)
        .json({ ok: true, message: "Order verified successfully" });
    } else {
      await OrderModel.findByIdAndDelete(orderId);

      return res.status(200).json({ ok: false, message: "Order cancelled" });
    }
  } catch (err) {
    await OrderModel.findByIdAndDelete(orderId);
    return res.status(500).json({ message: err.message });
  }
};

const getOrders = async (req, res) => {
  const { userId } = req.user;
  try {
    const orders = await OrderModel.find({ userId });

    return res.status(200).json({ ok: true, orders });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find({});

    return res.status(200).json({ ok: true, nHits: orders.length, orders });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const updateOrder = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  console.log(status);

  if (!orderId || !status)
    return res.status(400).json({ message: "=> missing fields" });
  try {
    const order = await OrderModel.findById(orderId);

    if (!order) return res.status(404).json({ message: "=> Order not found" });

    order.status = status;
    await order.save();

    return res
      .status(200)
      .json({ ok: true, message: "Order updated successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getOrder = async (req, res) => {
  const { orderId } = req.params;

  if (!orderId) return res.status(400).json({ message: "=> missing fields" });

  let { fields } = req.query;

  console.log(req.query);
  try {
    if (fields)
      fields = fields
        .split(",")
        .map((item) => item.trim())
        .join(" ");
    else fields = [];

    const order = await OrderModel.findById(orderId).select(fields);

    return res.status(200).json({ ok: true, fields, order });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export {
  placeOrder,
  verifyOrder,
  getOrders,
  getAllOrders,
  updateOrder,
  getOrder,
};
