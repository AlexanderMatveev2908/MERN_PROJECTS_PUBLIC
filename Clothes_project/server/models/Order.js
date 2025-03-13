import mongoose from "mongoose";

const OrdersSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },

  items: {
    type: Array,
    required: true,
  },

  amount: {
    type: Number,
    required: true,
  },

  address: {
    type: Object,
    required: true,
  },

  status: {
    type: String,
    required: true,
    default: "Order Placed",
  },

  paymentMethod: {
    type: String,
    required: true,
  },

  isPaid: {
    type: Boolean,
    required: true,
    default: false,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.models.Order || mongoose.model("order", OrdersSchema);
export default Order;
