import "dotenv/config";
import fs from "fs";
import path from "path";
import { products } from "./frontend_assets/assets.js";
import Product from "./models/Product.js";
import { connectDB } from "./config/mongoDB.js";
import { v2 as cloudinary } from "cloudinary";
import { connectCloudinary } from "./config/cloudinary.js";

const uploadCloud = async (imgPath) => {
  try {
    const file = fs.createReadStream(imgPath);

    const res = await cloudinary.uploader.upload(file.path, {
      folder: "clothes",
    });

    return { url: res.secure_url, public_id: res.public_id, path: imgPath };
  } catch (err) {
    throw err;
  }
};

export const uploadConcurrently = async (arrImgs) => {
  const promisesUpload = arrImgs.map((img) => uploadCloud(img));
  try {
    const imgsURL = await Promise.all(promisesUpload);

    return imgsURL;
  } catch (err) {
    // console.dir(err);
    throw err;
  }
};

const basePath = path.dirname(new URL(import.meta.url).pathname);

// console.log(path.dirname(new URL(import.meta.url).pathname).slice(1));

// MAP ARR PRO

const processProducts = async () => {
  const promises = products.map(async (product) => {
    try {
      const { _id, ...filteredProduct } = product;

      const imgPaths = filteredProduct.image.map((img) =>
        path.join(basePath.slice(1), "./frontend_assets", img)
      );

      const imgURLs = await uploadConcurrently(imgPaths);

      filteredProduct.image = imgURLs;
      filteredProduct.price = filteredProduct.price / 10;

      await Product.create(filteredProduct);
    } catch (err) {
      console.log(err);
    }
  });

  await Promise.all(promises);

  console.log("ok");
};

// FOR OF PROMISES IIFE

// const processProducts = async () => {
//   const promises = []; // Array to hold all promises

//   for (const product of products) {
//     promises.push(
//       (async () => {
//         try {
//           const { _id, ...filteredProduct } = product;

//           const imgPaths = filteredProduct.image.map((img) =>
//             path.join(basePath.slice(1), "./frontend_assets", img)
//           );

//           const imgURLs = await uploadConcurrently(imgPaths);

//           filteredProduct.image = imgURLs;

//           await Product.create(filteredProduct);
//         } catch (err) {
//           console.log(err);
//         }
//       })()
//     );
//   }

//   await Promise.all(promises);

//   console.log("ok");
// };

// FOR OF NO PRO, NO IIFE
// const processProducts = async () => {
//   for (const product of products) {
//     try {
//       const { _id, ...filteredProduct } = product;

//       const imgPaths = filteredProduct.image.map((img) =>
//         path.join(basePath.slice(1), "./frontend_assets", img)
//       );

//       const imgURLs = await uploadConcurrently(imgPaths);

//       filteredProduct.image = imgURLs;

//       await Product.create(filteredProduct);
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   console.log("ok");
// };

const insertProducts = async () => {
  try {
    await connectCloudinary();
    await connectDB();
    await processProducts();
  } catch (err) {
    console.log(err);
  }
};

insertProducts();
