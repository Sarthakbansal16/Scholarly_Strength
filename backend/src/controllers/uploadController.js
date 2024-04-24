import { uploadOnCloudinary } from "../utils/cloudinary.js";
import {Image} from "../models/Image.model.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {ApiError} from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// const uploadImages = asyncHandler(async (req, res, next) => {
//   try {
//     const imagesLocalPaths = req.files.map((file) => file.path);

//     if (!imagesLocalPaths || imagesLocalPaths.length === 0) {
//       throw new ApiError(400, "At least one image file is required");
//     }

//     // TODO: delete old images - assignment

//     const uploadedImages = [];

//     for (const localPath of imagesLocalPaths) {
//       const image = await uploadOnCloudinary(localPath);

//       if (!image.url) {
//         throw new ApiError(400, "Error while uploading an image");
//       }

//       const newImage = new Image({
//         user: req.user._id,
//         url: image.url,
//       });

//       await newImage.save();
//       uploadedImages.push(newImage);
//     }

//     return res
//       .status(200)
//       .json(new ApiResponse(200, uploadedImages, "Images uploaded successfully"));
//   } catch (error) {
//     next(error);
//   }
// });

const uploadImage = asyncHandler(async(req,res,next) => {
  Image.create({image :req.file.filename})
  .then(result => res.json(result))
  .catch(err => console.log(err))
})

const getImage = asyncHandler(async(req,res) => {
  Image.find()
  .then((images) => res.send({status: "ok", images:images}))
  .catch(err => res.json(err))
})

export { uploadImage,getImage };