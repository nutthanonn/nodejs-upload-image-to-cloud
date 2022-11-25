import express, { Request, Response } from "express";
import { handleMultipartData } from "../helpers/handleMultipartData";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const router = express.Router();

router.post("/api/uploadFiles", (req: Request, res: Response) => {
  try {
    handleMultipartData(req, res, async (err) => {
      if (err) {
        return res.status(500).send({ message: err.message });
      }

      if (!req.file) {
        return res.status(400).send({ message: "Please upload a file" });
      }

      cloudinary.uploader.upload(
        req.file.path,
        { folder: "uploadFiles" },
        async (err, result) => {
          if (err) {
            return res.status(500).send({ message: err.message });
          }

          return res
            .status(200)
            .send({ message: "File uploaded successfully", file: result });
        }
      );
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error });
  }
});

export { router as UploadFileRouter };
