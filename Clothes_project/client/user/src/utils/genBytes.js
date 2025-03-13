import CryptoJS from "crypto-js";

const ids = new Set();

export const genBytes = () => {
  let id;

  do {
    id = `${CryptoJS.lib.WordArray.random(32).toString(
      CryptoJS.enc.Hex
    )}-${Date.now()}`;
  } while (ids.has(id));

  ids.add(id);

  return id;
};
