"use client"

import { ReactNode } from "react"
import Image from "next/image"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

import { cn } from "@/lib/utils"

interface MeetingModalProps {
   isOpen: boolean
   onClose: () => void
   title: string
   className?: string
   buttonText?: string
   handleClick: () => void
   children?: ReactNode
   image?: string
   buttonIcon?: string
}

const MeetingModal = ({
   isOpen,
   buttonText,
   className,
   handleClick,
   onClose,
   title,
   children,
   image,
   buttonIcon,
}: MeetingModalProps) => {
   return (
      <Dialog open={isOpen} onOpenChange={onClose}>
         <DialogContent className="flex w-full max-w-[520px] flex-col gap-6 border-none bg-dark-1 px-6 py-9 text-white">
            <div className="flex flex-col gap-6">
               {image && (
                  <div className="flex justify-center">
                     <Image
                        src={image}
                        alt="image modal"
                        width={72}
                        height={72}
                        style={{ width: "auto", height: "auto" }}
                     />
                  </div>
               )}
               <h1 className={cn("text-3xl font-bold leading-[42px]", className)}>{title}</h1>
               {children}
               <Button className="bg-blue-1 focus-visible:ring-0" onClick={handleClick}>
                  {buttonIcon && (
                     <Image
                        src={buttonIcon}
                        alt="Button Icon"
                        width={13}
                        height={13}
                        style={{ height: "auto", width: "auto" }}
                     />
                  )}
                  &nbsp;
                  {buttonText || "Schedule Meeting"}
               </Button>
            </div>
         </DialogContent>
      </Dialog>
   )
}

export default MeetingModal
