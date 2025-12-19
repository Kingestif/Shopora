import * as z from 'zod'

export const userValidation = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().refine((val) => val.length > 8, {
        error: "Password length must exceed 8 characters"
    }),
    role: z.enum(['BUYER', "SELLER", "ADMIN"])
})

export const loginValidation = z.object({
    email: z.email(),
    password: z.string()
})

export const role = z.enum(["BUYER", "SELLER", "ADMIN"])

export type roleType = z.infer<typeof role>
export type userType = z.infer<typeof userValidation>
export type loginType = z.infer<typeof loginValidation>

export const emailVerify = z.object({
    token: z.string()
})

export const resetPassVerify = z.object({
    email: z.string()
})

export const resetPasswordInput = z.object({
    token: z.string(),
    password: z.string()
})

export const jwtDecode = z.object({
    id: z.string(),
    role: role
})

export type User = z.infer<typeof jwtDecode>