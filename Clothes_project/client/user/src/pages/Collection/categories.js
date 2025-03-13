import { genBytes } from "../../utils/genBytes";

export const mainCatObj = {
  mainTitle: "CATEGORIES",
  mainCategoriesArr: [
    { cat: "Men", id: genBytes() },
    { cat: "Women", id: genBytes() },
    { cat: "Kids", id: genBytes() },
  ],
};

export const subCatObj = {
  subTitle: "TYPE",
  subCategoriesArr: [
    { cat: "Topwear", id: genBytes() },
    { cat: "Bottomwear", id: genBytes() },
    { cat: "Winterwear", id: genBytes() },
  ],
};
