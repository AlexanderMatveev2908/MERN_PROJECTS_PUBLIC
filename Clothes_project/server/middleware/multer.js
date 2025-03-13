import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

export const uploadMiddleware = multer({ storage }).fields([
  ...new Array(4)
    .fill()
    .map((_, i) => ({ name: `image${i + 1}`, maxCount: 1 })),
]);
