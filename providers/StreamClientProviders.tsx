import { useEffect, useState } from "react"
import { useUser } from "@clerk/nextjs"
import { StreamVideoClient, StreamVideo } from "@stream-io/video-react-sdk"

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY
// const userId = "user-id"
// const token = "authentication-token"
// const user: User = { id: userId }

// const client = new StreamVideoClient({ apiKey, user, token })
// const call = client.call("default", "my-first-call")
// call.join({ create: true })

export function StreamVideoProvider({ children }: { children: React.ReactNode }) {
    const [videoClient, setVideoClient] = useState<StreamVideoClient | null>(null)
    const { user, isLoaded } = useUser()

    useEffect(() => {
        if (!isLoaded || !user) return
        if (!apiKey) throw new Error("Stream API key missing")
            
    }, [user, isLoaded])

    return <StreamVideo client={videoClient}></StreamVideo>
}
