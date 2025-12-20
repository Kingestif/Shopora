import express from 'express'
import morgan from 'morgan'
import authRoutes from './routes/authRoutes.js'
import sellerRoutes from './routes/sellerRoutes.js'
import buyerRoutes from './routes/buyerRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import { isAdmin, isBuyer, isSeller, protect } from './middlewares/auth.js'
import { limiter } from './utils/limiter.js' 
const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use('/auth', limiter, authRoutes)
app.use('/seller', protect, isSeller, sellerRoutes)
app.use('/product', protect, isBuyer, buyerRoutes)
app.use('/admin', protect, isAdmin, adminRoutes)

app.get('/', (req, res) => {
    res.send("Server is running")
})

export default app