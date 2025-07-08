import { Request, Response } from "express"
import S3Bucket from "../aws/s3";

const uploadContentToS3 = async (req: Request, res: Response): Promise<void> => {
  try {

    // const { } = req.body

    const logoBuffer = req.file?.buffer;
    const contentType = req.file?.mimetype || "image/png";

    const upload = new S3Bucket(logoBuffer, contentType)

    const result = await upload.uploadContentToS3();

    res.status(200).json({
      success: true, msg: "upload to s3 sucessfully", data: result
    })

  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ success: false, msg: "Error upload file", error });
  }
}

const getSignedUrl = async (req: Request, res: Response): Promise<void> => {
  try {
    const { key } = req.body;

    if (!key) {
      res.status(400).json({ success: false, msg: "Key is required" });
      return;
    }

    const s3Bucket = new S3Bucket(); // no body or contentType needed
    const signedUrl = await s3Bucket.getSignedUrlForObject(key);

    res.status(200).json({
      success: true,
      url: signedUrl,
    });
  } catch (error) {
    console.error("Error getting signed URL:", error);
    res.status(500).json({ success: false, msg: "Error getting signed URL", error });
  }
};


export { uploadContentToS3, getSignedUrl }