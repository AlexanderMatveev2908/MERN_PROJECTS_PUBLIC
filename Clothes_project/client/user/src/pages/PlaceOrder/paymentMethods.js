import { assets } from "../../frontend_assets/assets";
import { genBytes } from "../../utils/genBytes";

export const payments = [
  { _id: genBytes(), value: "stripe", image: assets.stripe_logo },
  { _id: genBytes(), value: "razorpay", image: assets.razorpay_logo },
  { _id: genBytes(), value: "cod", txt: "CASH ON DELIVERY" },
];
