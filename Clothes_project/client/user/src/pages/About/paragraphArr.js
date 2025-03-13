import { genBytes } from "../../utils/genBytes";
import { loremFormatter } from "../../utils/txtPlaceholderMaker";

export const paragraphArr = [
  {
    id: genBytes(),
    title: "Quality Assurance:",
    txt: loremFormatter(200),
  },
  {
    id: genBytes(),
    title: "Convenience:",
    txt: loremFormatter(200),
  },
  {
    id: genBytes(),
    title: "Exceptional Customer Service:",
    txt: loremFormatter(200),
  },
];
