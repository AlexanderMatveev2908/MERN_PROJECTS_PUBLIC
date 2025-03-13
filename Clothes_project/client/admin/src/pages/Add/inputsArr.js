import { genId } from "./../../utils/genId";

export const numFiles = 4;

//eslint-disable-next-line
export const filesIds = new Array(numFiles).fill(null).map((_) => genId());

export const categoriesArr = [
  {
    title: "Product Category",
    values: [
      { val: "Men", id: genId() },
      { val: "Women", id: genId() },
      { val: "Kids", id: genId() },
    ],
    id: genId(),
  },
  {
    title: "Product Subcategory",
    values: [
      { val: "Topwear", id: genId() },
      { val: "Bottomwear", id: genId() },
      { val: "Winterwear", id: genId() },
    ],
    id: genId(),
  },
];

export const sizesArr = [
  { val: "S", id: genId() },
  { val: "M", id: genId() },
  { val: "L", id: genId() },
  { val: "XL", id: genId() },
];

export const getValue = (title) => {
  return title === "Product Category" ? "category" : "subCategory";
};
