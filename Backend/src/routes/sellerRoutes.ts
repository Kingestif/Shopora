import { Router } from "express";
import { postProduct } from "../controllers/sellerControllers/postProduct.js";
import { upload } from "../middlewares/upload.js";

const router = Router();

router.post('/post-product',upload.single('image'), postProduct)

export default router