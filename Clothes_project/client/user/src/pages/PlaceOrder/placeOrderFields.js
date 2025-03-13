import { genBytes } from "../../utils/genBytes";

export const placeOrderFields = [
  {
    name: "firstName",
    type: "text",
    _id: genBytes(),
    placeholder: "First name...",
  },
  {
    name: "lastName",
    type: "text",
    _id: genBytes(),
    placeholder: "Last name...",
  },
  {
    name: "email",
    type: "email",
    _id: genBytes(),
    placeholder: "Email address...",
  },
  { name: "street", type: "text", _id: genBytes(), placeholder: "Street..." },
  { name: "city", type: "text", _id: genBytes(), placeholder: "City..." },
  { name: "state", type: "text", _id: genBytes(), placeholder: "State..." },
  {
    name: "zipcode",
    type: "number",
    _id: genBytes(),
    placeholder: "Zipcode...",
  },
  { name: "country", type: "text", _id: genBytes(), placeholder: "Country..." },
  { name: "phone", type: "text", _id: genBytes(), placeholder: "Phone..." },
];

export const styleInput =
  "border border-gray-300 rounded py-1.5 px-3.5 w-full outline-none";

export const singleRowNames = ["email", "street", "phone"];
