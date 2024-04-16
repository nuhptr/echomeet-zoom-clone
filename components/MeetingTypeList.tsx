"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@clerk/nextjs"
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk"
import ReactDatePicker from "react-datepicker"

import { useToast } from "@/components/ui/use-toast"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import HomeCard from "@/components/HomeCard"
import MeetingModal from "@/components/MeetingModal"

enum MeetingState {
   IS_SCHEDULE_MEETING = "isScheduleMeeting",
   IS_JOINING_MEETING = "isJoiningMeeting",
   IS_INSTANT_MEETING = "isInstantMeeting",
}

const initialValues = {
   dateTime: new Date(),
   description: "",
   link: "",
}

const MeetingTypeList = () => {
   const router = useRouter()
   const client = useStreamVideoClient()
   const { user } = useUser()
   const { toast } = useToast()

   const [meetingState, setMeetingState] = useState<MeetingState | undefined>()
   const [values, setValues] = useState(initialValues)
   const [callDetail, setCallDetail] = useState<Call>()

   async function createMeeting() {
      if (!client || !user) return

      try {
         if (!values.dateTime) {
            toast({ title: "please select a date and time" })
            return
         }

         const id = crypto.randomUUID()
         const call = client.call("default", id)
         if (!call) throw new Error("Failed to create call")

         const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString()
         const description = values.description || "Instant meeting"

         await call.getOrCreate({
            data: { starts_at: startsAt, custom: { description } },
         })
         setCallDetail(call)

         if (!values.description) router.push(`/meeting/${call.id}`)

         toast({ title: "Meeting created." })
      } catch (error) {
         console.error(error)
         toast({ title: "Failed to create meeting." })
      }
   }

   // Meeting link
   const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetail?.id}`

   return (
      <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
         <HomeCard
            img="/icons/ic_add_meeting.svg"
            title="New Meeting"
            description="Start an instant meeting"
            handleClick={() => setMeetingState(MeetingState.IS_INSTANT_MEETING)}
         />
         <HomeCard
            img="/icons/ic_join_meeting.svg"
            title="Join Meeting"
            description="Via invitation link"
            className="bg-blue-1"
            handleClick={() => setMeetingState(MeetingState.IS_JOINING_MEETING)}
         />
         <HomeCard
            img="/icons/ic_schedule.svg"
            title="Schedule Meeting"
            description="Plan your meeting"
            className="bg-purple-1"
            handleClick={() => setMeetingState(MeetingState.IS_SCHEDULE_MEETING)}
         />
         <HomeCard
            img="/icons/ic_recordings.svg"
            title="View Recordings"
            description="Meeting Recordings"
            className="bg-yellow-1"
            handleClick={() => router.push("/recordings")}
         />

         {/* If callDetail null open MeetingModal */}
         {!callDetail && (
            <MeetingModal
               isOpen={meetingState === MeetingState.IS_SCHEDULE_MEETING}
               onClose={() => setMeetingState(undefined)}
               title="Create Meeting"
               handleClick={createMeeting}>
               <div className="flex flex-col gap-2.5">
                  <label htmlFor="date" className="text-base leading-[22px] text-sky-2">
                     Add a Description
                  </label>
                  <Textarea
                     name="date"
                     className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
                     onChange={(event) => {
                        setValues({ ...values, description: event.target.value })
                     }}
                  />
               </div>
               <div className="flex w-full flex-col gap-2.5">
                  <label className="text-base leading-[22px] text-sky-2">
                     Select Date and Time
                  </label>
                  <ReactDatePicker
                     selected={values.dateTime}
                     onChange={(date) => setValues({ ...values, dateTime: date! })}
                     showTimeSelect
                     timeFormat="HH:mm"
                     timeIntervals={15}
                     timeCaption="time"
                     dateFormat="MMMM d, yyyy h:mm aa"
                     className="w-full p-2 rounded bg-dark-3 focus:outline-none"
                  />
               </div>
            </MeetingModal>
         )}

         {/* If callDetail not null and meetingState === "isScheduleMeeting" copy meeting link" */}
         {callDetail && (
            <MeetingModal
               isOpen={meetingState === MeetingState.IS_SCHEDULE_MEETING}
               onClose={() => setMeetingState(undefined)}
               title="Meeting Created"
               className="text-center"
               handleClick={() => {
                  navigator.clipboard.writeText(meetingLink)
                  toast({ title: "Link copied to clipboard." })
               }}
               image="/icons/ic_checked.svg"
               buttonIcon="/icons/ic_copy.svg"
               buttonText="Copy Meeting Link"
            />
         )}

         {/* modal will open when meetingState === "isInstantMeeting" */}
         <MeetingModal
            isOpen={meetingState === MeetingState.IS_INSTANT_MEETING}
            onClose={() => setMeetingState(undefined)}
            title="Start an Instant Meeting"
            className="text-center"
            buttonText="Start Meeting"
            handleClick={createMeeting}
         />

         {/* modal will open when meetingState === "isJoiningMeeting" */}
         <MeetingModal
            isOpen={meetingState === MeetingState.IS_JOINING_MEETING}
            onClose={() => setMeetingState(undefined)}
            title="Type the link here"
            className="text-center"
            buttonText="Join Meeting"
            handleClick={() => router.push(values.link)}>
            <Input
               placeholder="Meeting Link"
               className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
               onChange={(e) => setValues({ ...values, link: e.target.value })}
            />
         </MeetingModal>
      </section>
   )
}

export default MeetingTypeList
