import bcrypt from 'bcrypt'

export const hash = async (password:string) => {
    const hashedPassword = await bcrypt.hash(password, 12)
    return hashedPassword
}

export const compare = async(password:string, hashedPassword:string) => {
    return await bcrypt.compare(password, hashedPassword)
}