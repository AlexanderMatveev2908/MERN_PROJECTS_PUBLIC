import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "foods");
  },
  filename: (req, file, cb) => {
    // console.log(path.extname(file.originalname));
    const safeName = file.originalname.replace(/^[a-zA-Z0-9.-]/g, "_");
    cb(null, `${Date.now()}_${safeName}`);
  },
});

// const checkFile = (req, file, cb) => {
//   if (file.mimetype.startsWith("image")) cb(null, true);
//   else cb(new Error("=> only images are allowed"));
// };

const uploadImg = multer({ storage });

// fileFilter: checkFile

export { uploadImg };
