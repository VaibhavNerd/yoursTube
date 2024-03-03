import { Router } from "express";

import { upload } from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { uploadVideo, fetchVideos } from "../controllers/video.controller.js";

router.route("/upload-video").post(verifyJWT,
    upload.fields([
        {
            name: "videoFile",
            maxCount: 1
        },
        {
            name: "thumbnail",
            maxCount: 1
        }
    ]),
    uploadVideo
)

router.route("/fetch-videos").get(fetchVideos)

export default router