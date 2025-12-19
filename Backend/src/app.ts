import express from 'express'
import morgan from 'morgan'
import authRoutes from './routes/authRoutes.js'
import sellerRoutes from './routes/sellerRoutes.js'
const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use('/auth', authRoutes)
app.use('/seller', sellerRoutes)

app.get('/', (req, res)=> {
    res.send("Server is running") 
})

export default app