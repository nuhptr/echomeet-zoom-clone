"use client"

import { useRouter } from "next/navigation"
import { useUser } from "@clerk/nextjs"
import { useStreamVideoClient } from "@stream-io/video-react-sdk"

import { useGetCallById } from "@/hooks/useGetCallById"

import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

interface TableProps {
   title: string
   description: string
}

function Table({ title, description }: TableProps) {
   return (
      <div className="flex flex-col items-start gap-2 xl:flex-row">
         <h1 className="text-base font-medium text-sky-1 lg:text-xl xl:min-w-32">{title}</h1>
         <h1 className="truncate text-sm font-bold max-sm:max-w-[320px] lg:text-xl">
            {description}
         </h1>
      </div>
   )
}

export default function PersonalRoom() {
   const router = useRouter()
   const client = useStreamVideoClient()

   const { user } = useUser()
   const { toast } = useToast()

   const meetingId = user?.id
   const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`

   const { call } = useGetCallById(meetingId!)

   async function startRoom() {
      if (!client || !user) return

      if (!call) {
         const newCall = client.call("default", meetingId!)
         await newCall.getOrCreate({ data: { starts_at: new Date().toISOString() } })
      }

      router.push(`/meeting/${meetingId}?personal=true`)
   }

   return (
      <section className="flex flex-col gap-10 text-white size-full">
         <h1 className="text-3xl font-bold">Personal Room</h1>

         <div className="flex w-full flex-col gap-8 xl:max-w-[900px]">
            <Table title="Topic" description={`${user?.username}'s meeting room`} />
            <Table title="Meeting ID" description={meetingId!} />
            <Table title="Invite Link" description={meetingLink} />
         </div>

         <div className="flex gap-5">
            <Button onClick={startRoom} className="bg-blue-1">
               Start Meeting
            </Button>
            <Button
               className="bg-dark-3"
               onClick={() => {
                  navigator.clipboard.writeText(meetingLink)
                  toast({ title: "Link Copied" })
               }}>
               Copy Invitation
            </Button>
         </div>
      </section>
   )
}
