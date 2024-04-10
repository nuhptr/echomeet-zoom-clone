"use client"

import { useState } from "react"
import { useUser } from "@clerk/nextjs"
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk"

import MeetingSetup from "@/components/MeetingSetup"
import MeetingRoom from "@/components/MeetingRoom"
import Loader from "@/components/Loader"

import { useGetCallById } from "@/hooks/useGetCallById"

export default function Meeting({ params: { id } }: { params: { id: string } }) {
    const { user, isLoaded } = useUser()
    const [isSetupComplete, setIsSetupComplete] = useState(false)

    const { call, isCallLoading } = useGetCallById(id)

    if (!isLoaded || isCallLoading) return <Loader />

    return (
        <main className="w-full h-screen">
            <StreamCall call={call}>
                <StreamTheme>
                    {!isSetupComplete ? (
                        <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
                    ) : (
                        <MeetingRoom />
                    )}
                </StreamTheme>
            </StreamCall>
        </main>
    )
}
