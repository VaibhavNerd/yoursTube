import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User} from "../models/user.model.js"
import { Video } from "../models/video.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"
import mongoose from "mongoose";

// const registerUser = asyncHandler(async (req,res) =>{
//     res.status(200).json({
//         message : "ok"
//     })
// })


const uploadVideo = asyncHandler( async (req, res) => {
    // get video details from frontend
    // validation - not empty
    // check for images, check for thumbnail
    // upload them to cloudinary,
    // create video object - create entry in db 
    // check for videos model creation
    // return res
  

    const { title , description , duration, owner } = req.body
    //console.log("title: ", title);
    

    const userId = req.user._id; 

    if (
        [title, description , duration].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    // const existedUser = await User.findOne({
    //     $or: [{ username }, { email }]
    // })

    // if (existedUser) {
    //     throw new ApiError(409, "User with email or username already exists")
    // }

    //console.log(req.files);

    const videoLocalPath = req.files?.videoFile[0]?.path;
    const thumbnailLocalPath = req.files?.thumbnail[0]?.path;

    // let thumbnailLocalPath;
    // if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
    //     coverImageLocalPath = req.files.coverImage[0].path
    // }
    

    if (!videoLocalPath) {
        throw new ApiError(400, "video file is required")
    }
    if (!thumbnailLocalPath) {
        throw new ApiError(400, "thumbnail is required")
    }

    const video = await uploadOnCloudinary(videoLocalPath)
    const thumbnail = await uploadOnCloudinary(thumbnailLocalPath)

    if (!video) {
        throw new ApiError(400, "Avatar file is required")
    }
    if (!thumbnail) {
        throw new ApiError(400, "Avatar file is required")
    }
   

    const videoentry = await Video.create({
        title,
        description,
        duration,
        videoFile: video.url,
        thumbnail : thumbnail.url,
        owner : userId,
    })

    const createdVideo = await Video.findById(videoentry._id)
    

    if (!createdVideo) {
        throw new ApiError(500, "Something went wrong while uploading video")
    }

    return res.status(201).json(
        new ApiResponse(200, createdVideo, "video uploaded succesfully")
    )

} )

const fetchVideos = asyncHandler(async (req, res) => {
    try {
      // Fetch  videos 
      
      const videoslist = await Video.find()
      .sort({ createdAt: -1 }); 

      res.status(200).json(new ApiResponse(200, { videoslist }, "Videos fetched successfully"));
    } catch (error) {
      console.error('Error in fetching videos:', error);
      res.status(501).json(new ApiResponse(501, {}, 'fetching videos failed'));
    }
  });


export {
    uploadVideo,
    fetchVideos,
}