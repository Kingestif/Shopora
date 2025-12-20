import { Router } from "express";
import { getUsers } from "../controllers/adminControllers/getUsers.js";
import { getProducts } from "../controllers/buyerController/getProducts.js";

const router = Router()

router.get('/users', getUsers)
router.get('/products', getProducts)

export default router;