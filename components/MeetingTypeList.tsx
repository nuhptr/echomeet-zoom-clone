"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import MeetingHomeCard from "@/components/MeetingHomeCard"
import MeetingModal from "@/components/MeetingModal"

const initialValues = {
    dateTime: new Date(),
    description: "",
    link: "",
}

export default function MeetingTypeList() {
    const router = useRouter()
    const [meetingState, setMeetingState] = useState<
        "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
    >()

    function createMeeting() {}

    return (
        <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            <MeetingHomeCard
                img="/icons/ic_add_meeting.svg"
                title="New Meeting"
                description="Start an instant meeting"
                handleClick={() => setMeetingState("isInstantMeeting")}
            />
            <MeetingHomeCard
                img="/icons/ic_join_meeting.svg"
                title="Join Meeting"
                description="Via invitation link"
                className="bg-blue-1"
                handleClick={() => setMeetingState("isJoiningMeeting")}
            />
            <MeetingHomeCard
                img="/icons/ic_schedule.svg"
                title="Schedule Meeting"
                description="Plan your meeting"
                className="bg-purple-1"
                handleClick={() => setMeetingState("isScheduleMeeting")}
            />
            <MeetingHomeCard
                img="/icons/ic_recordings.svg"
                title="View Recordings"
                description="Meeting Recordings"
                className="bg-yellow-1"
                handleClick={() => router.push("/recordings")}
            />

            <MeetingModal
                isOpen={meetingState === "isInstantMeeting"}
                onClose={() => setMeetingState(undefined)}
                title="Start an Instant Meeting"
                className="text-center"
                buttonText="Start Meeting"
                handleClick={createMeeting}
            />
        </section>
    )
}
