import path from "path";
import fs from "fs";

const getCurrDir = () => {
  return decodeURIComponent(
    path
      .dirname(new URL(import.meta.url).pathname)
      .replace(/^\/([a-zA-Z]):/, "$1:")
  );
};

const pathImg = path.join(getCurrDir(), "uploads", "1736618267818-_ity.jpg");

console.log(pathImg);

fs.unlink(pathImg, (err) => {
  if (err) console.log(err);
  else console.log("File deleted successfully!");
});
