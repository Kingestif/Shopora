import express from 'express'
const router = express.Router()

router.get('/login', (req, res)=>{
    console.log("login route")
})

export default router