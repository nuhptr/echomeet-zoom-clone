"use client"

import { useState } from "react"
import {
   useCallStateHooks,
   CallControls,
   CallingState,
   CallParticipantsList,
   CallStatsButton,
   PaginatedGridLayout,
   SpeakerLayout,
} from "@stream-io/video-react-sdk"
import { useRouter, useSearchParams } from "next/navigation"
import { LayoutList, Users } from "lucide-react"

import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Loader from "@/components/Loader"
import EndCallButton from "@/components/EndCallButton"

import { cn } from "@/lib/utils"

enum CallLayoutType {
   SPEAKER_LEFT = "speaker-left",
   SPEAKER_RIGHT = "speaker-right",
   GRID = "grid",
}

export default function MeetingRoom() {
   const router = useRouter()
   const searchParamas = useSearchParams()
   const isPersonalRoom = !!searchParamas.get("personal") // !! converts the value to boolean

   const [layout, setLayout] = useState<CallLayoutType>(CallLayoutType.SPEAKER_LEFT)
   const [showParticipants, setShowParticipants] = useState(false)

   const { useCallCallingState } = useCallStateHooks()
   const callingState = useCallCallingState()

   if (callingState !== CallingState.JOINED) return <Loader />

   function CallLayout() {
      switch (layout) {
         case CallLayoutType.GRID:
            return <PaginatedGridLayout />
         case CallLayoutType.SPEAKER_LEFT:
            return <SpeakerLayout participantsBarPosition="left" />
         default:
            return <SpeakerLayout participantsBarPosition="right" />
      }
   }

   return (
      <section className="relative w-full h-screen pt-4 overflow-hidden text-white">
         {/* Main Meeting Room */}
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

         {/* Menu */}
         <div className="fixed bottom-0 flex flex-wrap items-center justify-center w-full gap-5">
            <CallControls onLeave={() => router.push("/")} />

            <DropdownMenu>
               <div className="flex items-center">
                  <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
                     <LayoutList size={20} className="text-white" />
                  </DropdownMenuTrigger>
               </div>
               <DropdownMenuContent className="text-white border-dark-1 bg-dark-1">
                  {/* mapping type of layout */}
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
               <div className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
                  <Users size={20} className="text-white" />
               </div>
            </button>

            {!isPersonalRoom && <EndCallButton />}
         </div>
      </section>
   )
}
