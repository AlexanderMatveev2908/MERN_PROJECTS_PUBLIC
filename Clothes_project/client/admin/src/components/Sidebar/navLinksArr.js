import { genId } from "../../utils/genId";
import { assets } from "./../../admin_assets/assets";

export const navLinksArr = [
  {
    path: "/add",
    label: "Add items",
    id: genId(),
    image: assets.add_icon,
  },
  {
    path: "/list",
    label: "List Items",
    id: genId(),
    image: assets.parcel_icon,
  },
  {
    path: "/orders",
    label: "Orders",
    id: genId(),
    image: assets.order_icon,
  },
];
