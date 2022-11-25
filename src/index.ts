import express from "express";
import { UploadFileRouter } from "./routers/UploadFileRouter";

const app = express();

(async () => {
  try {
    app.use(UploadFileRouter);

    app.listen(8000, () => {
      console.log("Server is running on port 8000");
    });
  } catch (error) {
    console.log(error);
  }
})();
