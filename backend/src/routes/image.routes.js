import {Router} from "express"
import { uploadImage,getImage } from "../controllers/uploadController.js"
import { upload } from "../middlewares/multer.middleware.js"

const router= Router()

router.route("/uploadimage").post(upload.single("image"),uploadImage)
router.route("/getimage").get(getImage)

export default router