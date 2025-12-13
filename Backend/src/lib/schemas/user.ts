import * as z from 'zod'

export const userValidation = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().refine((val)=> val.length > 8, {
        error: "Password length must exceed 8 characters"
    }),
    role: z.enum(['BUYER', "SELLER", "ADMIN"])
})

export type userType = z.infer<typeof userValidation>