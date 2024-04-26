"use client"

import { useEffect, useState } from "react"
import {
   DeviceSettings,
   useCall,
   useCallStateHooks,
   VideoPreview,
} from "@stream-io/video-react-sdk"

import Alert from "@/components/Alert"
import { Button } from "@/components/ui/button"

interface MeetingSetupProps {
   setIsSetupComplete: (value: boolean) => void
}

export default function MeetingSetup({ setIsSetupComplete }: MeetingSetupProps) {
   const { useCallEndedAt, useCallStartsAt } = useCallStateHooks()
   const callStartsAt = useCallStartsAt()
   const callEndedAt = useCallEndedAt()

   const callTimeNotArrived = callStartsAt && new Date(callStartsAt) > new Date()
   const callHasEnded = !!callEndedAt

   const call = useCall()

   if (!call) throw new Error("useStreamCall must be used within StreamCall component.")

   const [isMicCamToogledOn, setIsMicCamToogledOn] = useState(false)

   useEffect(() => {
      if (isMicCamToogledOn) {
         call?.camera.disable()
         call?.microphone.disable()
      } else {
         call?.camera.enable()
         call?.microphone.enable()
      }
   }, [isMicCamToogledOn, call?.camera, call?.microphone])

   if (callTimeNotArrived)
      return (
         <Alert
            title={`Your meeting has not started yet. It scheduled for 
            ${callStartsAt.toLocaleString()}`}
         />
      )

   if (callHasEnded)
      return (
         <Alert title="The meeting has been ended by the host" iconUrl="/icons/ic_call-ended.svg" />
      )

   const joinCallHandle = () => {
      call.join()
      setIsSetupComplete(true)
   }

   return (
      <div className="flex flex-col items-center justify-center w-full h-screen text-white gap-3">
         <h1 className="text-2xl font-bold">Setup</h1>
         <VideoPreview />

         <div className="flex items-center justify-center h-16 gap-3">
            <label className="flex items-center justify-center font-medium gap-2">
               <input
                  type="checkbox"
                  checked={isMicCamToogledOn}
                  onChange={(event) => setIsMicCamToogledOn(event.target.checked)}
               />
               Join with mic and camera off
            </label>
            <DeviceSettings />
         </div>

         <Button className="rounded-md bg-green-500 px-4 py-2.5" onClick={joinCallHandle}>
            Join Meeting
         </Button>
      </div>
   )
}
