import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log("Cloudinary Config:", {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET ? "set" : "not set",
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    console.log("Uploading file to Cloudinary:", localFilePath);
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: './public/temp'
    });
    // file has uploaded successfully
    console.log("file is uploaded on cloudinary", response.url);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); // remove the locally saved temporary file as the upload operation got failed
    // fs.unlinkSync(localFilePath)
    return null;
  }
};
export {uploadOnCloudinary}