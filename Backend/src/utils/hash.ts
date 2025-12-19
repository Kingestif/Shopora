import bcrypt from 'bcrypt'

export const hash = async (input:string) => {
    const hashedValue = await bcrypt.hash(input, 12)
    return hashedValue
}

export const compare = async(input:string, hashedValue:string) => {
    return await bcrypt.compare(input, hashedValue)
}