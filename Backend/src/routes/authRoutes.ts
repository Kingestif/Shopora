import express from 'express'
import { login } from '../controllers/authControllers/login.js'
import { signup } from '../controllers/authControllers/signup.js'
import { emailVerification } from '../controllers/authControllers/emailVerification.js'
import { requestPasswordReset } from '../controllers/authControllers/requestPasswordReset.js'
import { resetPassword } from '../controllers/authControllers/resetPassword.js'
import { logout } from '../controllers/authControllers/logout.js'
import { currentUser } from '../controllers/authControllers/currentUser.js'
import { protect } from '../middlewares/auth.js'
const router = express.Router()

router.post('/login', login)
router.post('/signup', signup)
router.post('/emailVerification', emailVerification)
router.post('/reset-request', requestPasswordReset)
router.post('/reset-password', resetPassword)
router.post('/logout', logout)
router.get('/me', protect, currentUser )

export default router