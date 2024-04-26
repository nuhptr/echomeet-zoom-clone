"use client"

import { Call, CallRecording } from "@stream-io/video-react-sdk"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { useGetCalls } from "@/hooks/useGetCalls"

import { useToast } from "@/components/ui/use-toast"
import Loader from "@/components/Loader"
import MeetingCard from "@/components/MeetingCard"

interface CallListProps {
   type: "ended" | "upcoming" | "recordings"
}

export default function CallList({ type }: CallListProps) {
   const router = useRouter()
   const { toast } = useToast()

   const { endedCalls, upcomingCalls, callRecordings, isLoading } = useGetCalls()
   const [recordings, setRecordings] = useState<CallRecording[]>([])

   function getCalls() {
      switch (type) {
         case "ended":
            return endedCalls
         case "recordings":
            return recordings
         case "upcoming":
            return upcomingCalls
         default:
            return []
      }
   }

   function getNoCallsMessage() {
      switch (type) {
         case "ended":
            return "No Previous Calls"
         case "upcoming":
            return "No Upcoming Calls"
         case "recordings":
            return "No Recordings"
         default:
            return ""
      }
   }

   useEffect(() => {
      async function fetchRecordings() {
         try {
            const callData = await Promise.all(
               callRecordings?.map((meeting) => meeting.queryRecordings()) ?? []
            )

            const recordings = callData
               .filter((call) => call.recordings.length > 0)
               .flatMap((call) => call.recordings)

            setRecordings(recordings)
         } catch (error) {
            toast({ title: "Try Again Later" })
         }
      }

      if (type === "recordings") fetchRecordings()
   }, [type, callRecordings, toast])

   if (isLoading) return <Loader />

   const calls = getCalls()
   const noCallsMessage = getNoCallsMessage()

   return (
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
         {calls &&
            calls.length > 0 &&
            calls.map((meeting: Call | CallRecording) => (
               <MeetingCard
                  key={(meeting as Call).id}
                  icon={
                     type === "ended"
                        ? "/icons/ic_previous.svg"
                        : type === "upcoming"
                        ? "/icons/ic_upcoming.svg"
                        : "/icons/ic_recordings.svg"
                  }
                  title={
                     (meeting as Call).state?.custom?.description ||
                     (meeting as CallRecording).filename?.substring(0, 20) ||
                     "No Description"
                  }
                  date={
                     (meeting as Call).state?.startsAt?.toLocaleString() ||
                     (meeting as CallRecording).start_time?.toLocaleString()
                  }
                  isPreviousMeeting={type === "ended"}
                  link={
                     type === "recordings"
                        ? (meeting as CallRecording).url
                        : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${(meeting as Call).id}`
                  }
                  buttonIcon1={type === "recordings" ? "/icons/ic_play.svg" : undefined}
                  buttonText={type === "recordings" ? "Play" : "Start"}
                  handleClick={
                     type === "recordings"
                        ? () => router.push(`${(meeting as CallRecording).url}`)
                        : () => router.push(`/meeting/${(meeting as Call).id}`)
                  }
               />
            ))}

         {!calls && <h1 className="text-2xl font-bold text-white">{noCallsMessage}</h1>}
      </div>
   )
}
