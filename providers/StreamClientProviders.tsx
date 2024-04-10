"use client"

import { useEffect, useState } from "react"
import { useUser } from "@clerk/nextjs"
import { StreamVideoClient, StreamVideo } from "@stream-io/video-react-sdk"

import { tokenProvider } from "@/actions/stream.action"

import Loader from "@/components/Loader"

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY

export function StreamVideoProvider({ children }: { children: React.ReactNode }) {
    const [videoClient, setVideoClient] = useState<StreamVideoClient | null>(null)
    const { user, isLoaded } = useUser()

    useEffect(() => {
        if (!isLoaded || !user) return
        if (!apiKey) throw new Error("Stream API key missing")

        const client = new StreamVideoClient({
            apiKey,
            user: { id: user?.id, name: user?.username || user?.id, image: user?.imageUrl },
            tokenProvider,
        })

        setVideoClient(client)
    }, [user, isLoaded])

    if (!videoClient) return <Loader />

    return <StreamVideo client={videoClient}>{children}</StreamVideo>
}
