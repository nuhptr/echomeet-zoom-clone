import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { LayoutList, Users } from "lucide-react"
import {
    CallControls,
    CallingState,
    CallParticipantsList,
    CallStatsButton,
    PaginatedGridLayout,
    SpeakerLayout,
    useCallStateHooks,
} from "@stream-io/video-react-sdk"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import EndCallButton from "@/components/EndCallButton"
import Loader from "@/components/Loader"

import { cn } from "@/lib/utils"

type CallLayoutType = "speaker-left" | "speaker-right" | "grid"

export default function MeetingRoom() {
    const searchParamas = useSearchParams()
    const isPersonalRoom = !!searchParamas.get("personal") // !! converts the value to boolean
    const router = useRouter()
    const [layout, setLayout] = useState<CallLayoutType>("speaker-left")
    const [showParticipants, setShowParticipants] = useState(false)

    const { useCallCallingState } = useCallStateHooks()
    const callingState = useCallCallingState()

    if (callingState !== CallingState.JOINED) {
        return <Loader />
    }

    const CallLayout = () => {
        switch (layout) {
            case "grid":
                return <PaginatedGridLayout />
            case "speaker-right":
                return <SpeakerLayout participantsBarPosition="left" />
            default:
                return <SpeakerLayout participantsBarPosition="right" />
        }
    }

    return (
        <section className="relative w-full h-screen pt-4 overflow-hidden text-white">
            <div className="relative flex items-center justify-center size-full">
                <div className="flex size-full max-w-[1000px] items-center">
                    <CallLayout />
                </div>
                <div
                    className={cn("h-[calc(100vh-86px)] hidden ml-2", {
                        "show-block": showParticipants,
                    })}>
                    <CallParticipantsList onClose={() => setShowParticipants(false)} />
                </div>
            </div>

            <div className="fixed bottom-0 flex flex-wrap items-center justify-center w-full gap-5">
                <CallControls onLeave={() => router.push("/")} />

                <DropdownMenu>
                    <div className="flex items-center">
                        <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
                            <LayoutList size={20} className="text-white" />
                        </DropdownMenuTrigger>
                    </div>
                    <DropdownMenuContent className="text-white border-dark-1 bg-dark-1">
                        {["Grid", "Speaker-Left", "Speaker-Right"].map((item, index) => (
                            <div key={index}>
                                <DropdownMenuItem
                                    onClick={() => setLayout(item.toLowerCase() as CallLayoutType)}>
                                    {item}
                                </DropdownMenuItem>
                            </div>
                        ))}
                        <DropdownMenuSeparator className="border-dark-1" />
                    </DropdownMenuContent>
                </DropdownMenu>

                <CallStatsButton />

                <button onClick={() => setShowParticipants((prev) => !prev)}>
                    <div
                        className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 
                        hover:bg-[#4c535b]">
                        <Users size={20} className="text-white" />
                    </div>
                </button>
                {!isPersonalRoom && <EndCallButton />}
            </div>
        </section>
    )
}
