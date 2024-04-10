"use server"

import { currentUser } from "@clerk/nextjs"
import { StreamClient } from "@stream-io/node-sdk"

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY
const apiSecret = process.env.STREAM_SECRET_KEY

export const tokenProvider = async () => {
    const user = await currentUser()

    if (!user) throw new Error("User is not logged in")
    if (!apiKey) throw new Error("Stream API key missing")
    if (!apiSecret) throw new Error("Stream secret key missing")

    const client = new StreamClient(apiKey, apiSecret)

    const expired = Math.round(new Date().getTime() / 1000) + 60 + 60 // 1 hour
    const issued = Math.floor(Date.now() / 1000) - 60 // 1 minute before current time

    const token = client.createToken(user.id, expired, issued)

    return token
}
