import express from 'express'
import { login } from '../controllers/authControllers/login.js'
import { signup } from '../controllers/authControllers/signup.js'
import { emailVerification } from '../controllers/authControllers/emailVerification.js'
import { resetPassword } from '../controllers/authControllers/resetPassword.js'
const router = express.Router()

router.post('/login', login)
router.post('/signup', signup)
router.post('/emailVerification', emailVerification)
router.post('/reset-password', resetPassword)

export default router