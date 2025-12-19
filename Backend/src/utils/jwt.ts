import type { roleType } from "../lib/schemas/user.js";
import jwt from 'jsonwebtoken'

export const generateToken = async (id: string, role: roleType) => {
    const JWT_SECRET = process.env.JWT_SECRET
    const JWT_EXPIRE = Number(process.env.JWT_EXPIRE)
    if(!JWT_SECRET || !JWT_EXPIRE) throw new Error('Server error')

    const token = jwt.sign({
        id,
        role
    }, JWT_SECRET, {expiresIn: JWT_EXPIRE} )

    return token
}