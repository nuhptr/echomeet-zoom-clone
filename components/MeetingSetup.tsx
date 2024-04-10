import { useEffect, useState } from "react"
import { DeviceSettings, useCall, VideoPreview } from "@stream-io/video-react-sdk"

import { Button } from "@/components/ui/button"

type MeetingSetupProps = {
    setIsSetupComplete: (value: boolean) => void
}

export default function MeetingSetup({ setIsSetupComplete }: MeetingSetupProps) {
    const call = useCall()

    const [isMicCamToogledOn, setIsMicCamToogledOn] = useState<boolean>(false)

    useEffect(() => {
        if (isMicCamToogledOn) {
            call?.camera.disable()
            call?.microphone.disable()
        } else {
            call?.camera.enable()
            call?.microphone.enable()
        }
    }, [isMicCamToogledOn, call?.camera, call?.microphone])

    if (!call) {
        throw new Error("useCall must be used within StreamCall component.")
    }

    return (
        <div className="flex flex-col items-center justify-center w-full h-screen text-white gap-3">
            <h1 className="text-2xl font-bold">Setup</h1>
            <VideoPreview />
            <div className="flex items-center justify-center h-16 gap-3">
                <label htmlFor="" className="flex items-center justify-center font-medium gap-2">
                    <input
                        type="checkbox"
                        checked={isMicCamToogledOn}
                        onChange={(event) => setIsMicCamToogledOn(event.target.checked)}
                    />
                    Join with mic and camera off
                </label>
                <DeviceSettings />
            </div>
            <Button
                className="rounded-md bg-green-500 px-4 py-2.5"
                onClick={() => {
                    call.join()
                    setIsSetupComplete(true)
                }}>
                Join Meeting
            </Button>
        </div>
    )
}
