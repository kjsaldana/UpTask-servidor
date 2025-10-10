import { compare, genSalt, hashSync } from "bcryptjs"

export const hashPassword = async (password: string) => {
    const salt = await genSalt(10)
    return await hashSync(password, salt)
}

export const checkPassword = async (enteredPassword: string, hashedPassword: string) => {
    return await compare(enteredPassword, hashedPassword)
}