import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, callback) => callback(null, `${__dirname}/uploads`),
  filename: (req, file, callback) => {
    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;

    callback(null, uniqueName);
  },
});

export const handleMultipartData = multer({
  storage,
  limits: { fileSize: 1000000 * 5 },
}).single("image");
