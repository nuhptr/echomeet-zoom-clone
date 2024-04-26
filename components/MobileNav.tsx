"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet"

import { sidebarLinks } from "@/constants"
import { cn } from "@/lib/utils"

export default function MobileNav() {
   const pathname = usePathname()

   return (
      <section className="w-full max-w-[264px]">
         <Sheet>
            <SheetTrigger asChild>
               <Image
                  src="/icons/ic_hamburger.svg"
                  width={36}
                  height={36}
                  alt="Hamburger Icon"
                  className="cursor-pointer sm:hidden"
               />
            </SheetTrigger>
            <SheetContent side="left" className="border-none bg-dark-1">
               <Link href="/" className="flex items-center gap-1">
                  <Image src="/icons/logo.svg" alt="Echomeet Logo" width={32} height={32} />{" "}
                  <p className="text-[26px] font-extrabold text-white">Echomeet</p>
               </Link>

               <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
                  <SheetClose asChild>
                     <section className="flex flex-col h-full pt-16 text-white gap-6">
                        {sidebarLinks.map((item) => {
                           const isActive = pathname === item.route // just item.route, we don't need startsWith(`${item.route}/`)

                           return (
                              <SheetClose asChild key={item.route}>
                                 <Link
                                    key={item.label}
                                    href={item.route}
                                    className={cn(
                                       "flex gap-4 items-center p-4 rounded-lg w-full max-w-60",
                                       { "bg-blue-1": isActive }
                                    )}>
                                    <Image
                                       src={item.imgURL}
                                       alt={item.label}
                                       width={20}
                                       height={20}
                                    />
                                    <p className="font-semibold">{item.label}</p>
                                 </Link>
                              </SheetClose>
                           )
                        })}
                     </section>
                  </SheetClose>
               </div>
            </SheetContent>
         </Sheet>
      </section>
   )
}
