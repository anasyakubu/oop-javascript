import {
  S3Client, PutObjectCommand, GetObjectCommand, DeleteBucketCommand,
} from "@aws-sdk/client-s3";
import { NodeHttpHandler } from "@aws-sdk/node-http-handler";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { CloudFrontClient, CreateInvalidationCommand, } from "@aws-sdk/client-cloudfront";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

const RandomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString("hex");

class S3Bucket {
  private AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY || "";
  private AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY || "";
  private AWS_BUCKET_REGION = process.env.AWS_BUCKET_REGION || "";
  private AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME || "";
  private AWS_CLOUDFRONT_DISTRIBUTION_NAME = process.env.AWS_CLOUDFRONT_DISTRIBUTION_NAME || "";

  constructor(private key: string, private body: any, private ContentType: string) { }

  private createS3Client() {
    return new S3Client({
      credentials: {
        accessKeyId: this.AWS_ACCESS_KEY,
        secretAccessKey: this.AWS_SECRET_ACCESS_KEY,
      },
      region: this.AWS_BUCKET_REGION,
      requestHandler: new NodeHttpHandler({
        connectionTimeout: 20000,
        socketTimeout: 20000,
      }),
    });
  }

  async uploadContentToS3() {
    try {
      const s3 = this.createS3Client();
      const key = RandomImageName();

      const params = {
        Bucket: this.AWS_BUCKET_NAME,
        Key: key,
        Body: this.body,
        ContentType: this.ContentType,
      };

      const command = new PutObjectCommand(params);
      await s3.send(command);

      return {
        message: "Upload successful",
        key,
        url: `https://${this.AWS_BUCKET_NAME}.s3.${this.AWS_BUCKET_REGION}.amazonaws.com/${key}`,
      };
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  }

  // Example: optionally generate a signed URL
  async getSignedUrlForObject(key: string, expiresInSeconds = 3600) {
    const s3 = this.createS3Client();
    const command = new GetObjectCommand({
      Bucket: this.AWS_BUCKET_NAME,
      Key: key,
    });
    return await getSignedUrl(s3, command, { expiresIn: expiresInSeconds });
  }

  // Example: optionally invalidate CloudFront cache
  async invalidateCloudFrontCache(paths: string[] = [`/${this.key}`]) {
    const cloudfront = new CloudFrontClient({
      credentials: {
        accessKeyId: this.AWS_ACCESS_KEY,
        secretAccessKey: this.AWS_SECRET_ACCESS_KEY,
      },
      region: "us-east-1", // CloudFront uses us-east-1 for all operations
    });

    const command = new CreateInvalidationCommand({
      DistributionId: this.AWS_CLOUDFRONT_DISTRIBUTION_NAME,
      InvalidationBatch: {
        CallerReference: Date.now().toString(),
        Paths: {
          Quantity: paths.length,
          Items: paths,
        },
      },
    });

    return await cloudfront.send(command);
  }

  async deleteBucket() {
    try {
      const s3 = this.createS3Client();

      const command = new DeleteBucketCommand({
        Bucket: this.AWS_BUCKET_NAME,
      });

      const response = await s3.send(command);

      return {
        message: `Bucket "${this.AWS_BUCKET_NAME}" deleted successfully.`,
        response,
      };
    } catch (error: any) {
      console.error("Error deleting bucket:", error);
      throw new Error(
        `Failed to delete bucket "${this.AWS_BUCKET_NAME}": ${error.message}`
      );
    }
  }


}

export default S3Bucket;
