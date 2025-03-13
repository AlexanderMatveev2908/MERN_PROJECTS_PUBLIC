import { genBytes } from "../../utils/genBytes";

export const footerLinksArr = [
  {
    name: "Home",
    path: "/",
    id: genBytes(),
  },
  {
    name: "About Us",
    path: "/about",
    id: genBytes(),
  },
  {
    name: "Delivery",
    path: "#",
    id: genBytes(),
  },
  {
    name: "Privacy Policy",
    path: "#",
    id: genBytes(),
  },
];
