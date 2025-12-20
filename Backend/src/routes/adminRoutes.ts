import { Router } from "express";
import { getUsers } from "../controllers/adminControllers/getUsers.js";

const router = Router()

router.get('/users', getUsers)

export default router;