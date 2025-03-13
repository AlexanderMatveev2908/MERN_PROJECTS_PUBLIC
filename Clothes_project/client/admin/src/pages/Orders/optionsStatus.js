import { genId } from "../../utils/genId";

export const optStatusArr = [
  { id: genId(), val: "Order Placed" },
  { id: genId(), val: "Packing" },
  { id: genId(), val: "Shipped" },
  { id: genId(), val: "Out For Delivery" },
  { id: genId(), val: "Delivered" },
];
