import express from 'express'
import { login } from '../controllers/authControllers/login.js'
import { signup } from '../controllers/authControllers/signup.js'
const router = express.Router()

router.post('/login', login)
router.post('/signup', signup)

export default router