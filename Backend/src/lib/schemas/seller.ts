import * as z from 'zod'

export const productVerification = z.object({
    name: z.string(),
    price: z.string(),
    description: z.string()
})

export const fileSchema = z.object({
    fieldname: z.string(),
    originalname: z.string(),
    encoding: z.string(),
    mimetype:z.string(),
    buffer: z.any(),
    size: z.number()
})

export type product = z.infer<typeof productVerification>