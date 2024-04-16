"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

import { sidebarLinks } from "@/constants"
import { cn } from "@/lib/utils"

const Sidebar = () => {
   const pathname = usePathname()

   return (
      <section className="sticky top-0 left-0 flex flex-col justify-between h-screen w-fit bg-dark-1 p-6 pt-28 text-white max-sm:hidden lg:w-[264px]">
         <div className="flex flex-col flex-1 gap-6">
            {sidebarLinks.map((item) => {
               const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`)

               return (
                  <Link
                     key={item.label}
                     href={item.route}
                     className={cn("flex gap-4 items-center p-4 rounded-lg justify-start", {
                        "bg-blue-1": isActive,
                     })}>
                     <Image src={item.imgURL} alt={item.label} width={24} height={24} />
                     <p className="text-lg font-semibold max-lg:hidden">{item.label}</p>
                  </Link>
               )
            })}
         </div>
      </section>
   )
}

export default Sidebar
