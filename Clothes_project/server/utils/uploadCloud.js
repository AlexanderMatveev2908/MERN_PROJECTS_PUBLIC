import { v2 as cloudinary } from "cloudinary";
const uploadCloud = async (imgPath) => {
  try {
    const res = await cloudinary.uploader.upload(imgPath, {
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

export const deleteCloudFile = async (public_id) => {
  try {
    const res = await cloudinary.uploader.destroy(public_id);
    return res;
  } catch (err) {
    throw err;
  }
};

export const deleteConcurrently = async (arrPublicIds) => {
  const promisesDelete = arrPublicIds.map((id) => deleteCloudFile(id));

  try {
    const res = await Promise.all(promisesDelete);
    return res;
  } catch (err) {
    throw err;
  }
};
