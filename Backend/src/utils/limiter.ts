import { rateLimit } from 'express-rate-limit'
import { ENV } from '../lib/schemas/env.js'

export const limiter = rateLimit({
    windowMs: Number(ENV.WINDOW_LIMIT),
    limit: Number(ENV.REQUEST_LIMIT),
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    ipv6Subnet: 56,
    handler: (req, res) => {
        return res.status(429).json({
            status:"error",
            message: "Too many attempts, please try again in 10 minutes"
        })
    }
})