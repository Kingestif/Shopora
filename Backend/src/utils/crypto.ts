export const createToken = async () => {
    return crypto.randomUUID()
}