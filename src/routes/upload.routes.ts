
import express from "express";
import { uploadContentToS3, getSignedUrl } from "../controllers/upload.controller";
const router = express.Router();
// import { requireAuth } from "../middleware/authMiddleware";
import upload from "../middleware/upload";


//*********** ALL APP ROUTES ***********//
router.post("/upload", upload.single("upload"), uploadContentToS3);
router.post("/get", getSignedUrl);



export default router;
