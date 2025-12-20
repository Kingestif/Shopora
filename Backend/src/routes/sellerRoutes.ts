import { Router } from "express";
import { postProduct } from "../controllers/sellerControllers/postProduct.js";
import { upload } from "../middlewares/upload.js";
import { getProducts } from "../controllers/sellerControllers/getProducts.js";
import { updateProduct } from "../controllers/sellerControllers/updateProduct.js";

const router = Router();

router.post('/post-product', upload.single('image'), postProduct)
router.post('/products', getProducts)
router.patch('/product', updateProduct)

export default router