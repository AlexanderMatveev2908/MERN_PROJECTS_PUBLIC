import { v2 as cloudinary } from "cloudinary";
import {
  deleteConcurrently,
  uploadConcurrently,
} from "../utils/uploadCloud.js";
import Product from "./../models/Product.js";
import { deleteLocals } from "../utils/deleteLocals.js";
import mongoose from "mongoose";

export const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  return res.status(200).json({ products, success: true });
};

export const getSingleProduct = async (req, res) => {
  const { id } = req.params;
  if (!id || !mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ msg: "invalid id", success: false });

  const product = await Product.findById(id);
  if (!product)
    return res.status(404).json({ msg: "Product not found", success: false });

  return res.status(200).json({ product, success: true });
};

export const createProduct = async (req, res) => {
  const { name, description, price, category, subCategory, sizes, bestseller } =
    req.body;

  if (
    ![name, description, price, category, subCategory, bestseller].every(
      (el) => !!el
    ) ||
    !sizes?.length
  )
    return res
      .status(400)
      .json({ msg: "All fields are required", success: false });

  const images = [];

  if (Object.keys(req.files)?.length) {
    Object.keys(req.files).forEach((key, i) => {
      images.push(req.files[key][0]);
    });
  } else
    return res.status(400).json({ msg: "No files uploaded", success: false });

  const filteredImages = images.filter((img) => img !== undefined);

  try {
    const imgPaths = filteredImages.map((img) => img.path);
    const imagesURL = await uploadConcurrently(imgPaths);

    const productData = {
      name,
      description,
      price: +price,
      category,
      subCategory,
      sizes: JSON.parse(sizes),
      bestseller: bestseller === "true" ? true : false,
      image: imagesURL,
    };

    await Product.create(productData);

    return res
      .status(201)
      .json({ msg: "Product created successfully", success: true });
  } catch (err) {
    console.dir(err);
    return res.status(500).json({ msg: err.message, success: false });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  if (!id)
    return res
      .status(400)
      .json({ msg: "Product ID is required", success: false });

  const product = await Product.findById(id);
  if (!product)
    return res.status(404).json({ msg: "Product not found", success: false });

  try {
    const publicIdsImages = product.image.map((img) => img.public_id);
    await deleteConcurrently(publicIdsImages);

    const localPaths = product.image.map((img) => img.path);
    await deleteLocals(localPaths);

    await Product.findByIdAndDelete(id);

    return res
      .status(200)
      .json({ msg: "Product deleted successfully", success: true });
  } catch (err) {
    return res.status(500).json({ msg: err.message, success: false });
  }
};
