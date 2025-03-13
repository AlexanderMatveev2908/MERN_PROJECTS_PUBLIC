import { genBytes } from "../../utils/genBytes";

export const optionsPriorityArr = [
  { val: "relevant", txt: "Relevant", id: genBytes() },
  { val: "low-high", txt: "Low to High", id: genBytes() },
  { val: "high-low", txt: "High to Low", id: genBytes() },
];
