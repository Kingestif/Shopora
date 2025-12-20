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
    mimetype: z.string(),
    buffer: z.any(),
    size: z.number()
})

export type product = z.infer<typeof productVerification>

export const uploadResult = z.object({
    url: z.url(),
    public_id: z.string()
})

export type UploadResult = z.infer<typeof uploadResult>

export const updateVerification = z.object({
    id:z.uuid()
}).merge(productVerification.partial())

export type update = z.infer<typeof updateVerification>