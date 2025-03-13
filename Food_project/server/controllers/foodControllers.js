import FoodModel from "../models/FoodModel.js";
import fs from "fs";
import path from "path";
import cloudinary from "../config/cloudinary.js";
import uploadCloud from "../utils/uploadCloud.js";
import getCurrDir from "../utils/getCurrDir.js";

const addFood = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const { filename } = req.file;

    if (![name, description, price, filename, category].every(Boolean))
      return res
        .status(400)
        .json({ message: "=> All fields are required ADD_FOOD" });

    const { url, publicId } = await uploadCloud(filename);

    if (!url || !publicId)
      return res.status(500).json({ message: "=> Image upload failed" });

    await FoodModel.create({
      name,
      description,
      price,
      image: filename,
      publicId,
      url,
      category,
    });

    res.status(201).json({ message: "=> Food added successfully", ok: true });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getFoodList = async (req, res) => {
  try {
    const foods = await FoodModel.find({});

    return res.status(200).json({ foods, ok: true });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const removeFood = async (req, res) => {
  const { id } = req.params;

  if (!id)
    return res
      .status(400)
      .json({ message: "=> Food ID is required REMOVE_FOOD" });

  try {
    const item = await FoodModel.findById(id);

    if (!item) return res.status(404).json({ message: "=> Food not found" });

    const cloudRes = await cloudinary.uploader.destroy(item.publicId);

    if (!cloudRes.result === "ok")
      return res
        .status(500)
        .json({ message: "=> Image deletion failed CLOUD" });

    const imgPath = path.join(getCurrDir(), "foods", item.image);

    try {
      await fs.promises.unlink(imgPath);
    } catch (err) {
      return res
        .status(500)
        .json({ message: "=> Image deletion failed LOCAL" });
    }

    const deleteRes = await item.deleteOne();

    if (!deleteRes.deletedCount)
      return res.status(500).json({ message: "=> Food deletion failed MONGO" });

    return res
      .status(200)
      .json({ message: "=> Food removed successfully", ok: true });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
export { addFood, getFoodList, removeFood };
