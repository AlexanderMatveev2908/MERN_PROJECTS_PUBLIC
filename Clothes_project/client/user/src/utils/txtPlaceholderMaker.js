import { lorem } from "../constants/lorem.js";

export const genTxt = (txt, numChars) => {
  let repeated = txt.repeat(Math.ceil(numChars / txt.length));

  return repeated.slice(0, numChars);
};

export const txtFormatter = (txt, numChars, cutWords = false) => {
  let truncated;
  let firstWord = txt.split(" ")[0];

  if (numChars > txt.length) truncated = genTxt(txt, numChars);
  else if (numChars < firstWord.length && !cutWords) truncated = firstWord;
  else truncated = txt.slice(0, numChars);

  let lastSpaceIndex = truncated.lastIndexOf(" ");

  if (cutWords) {
    return `${truncated}...`;
  } else {
    if (lastSpaceIndex === -1) return truncated;
    else return truncated.split(" ").slice(0, -1).join(" ");
  }
};

export const loremFormatter = (numChars, cutWords) =>
  txtFormatter(lorem, numChars, cutWords);
