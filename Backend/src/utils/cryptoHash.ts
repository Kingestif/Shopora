import crypto from 'crypto'

export const cryptoHash = async (input: string) => {
    const hashedInput = crypto.createHash("sha256").update(input).digest("hex");
    return hashedInput
}