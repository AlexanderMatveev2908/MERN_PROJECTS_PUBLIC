import cloudinary from "../config/cloudinary.js";
import getCurrDir from "./getCurrDir.js";
import path from "path";
const uploadCloud = async (filename) => {
  try {
    const filePath = path
      .join(getCurrDir(), "foods", filename)
      .replace(/\\/g, "/");

    const res = await cloudinary.uploader.upload(filePath, {
      asset_folder: "foods/",
    });

    return {
      url: res.secure_url,
      publicId: res.public_id,
    };
  } catch (err) {
    throw err;
  }
};

export default uploadCloud;
