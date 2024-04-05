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
                <SheetTrigger>
                    <Image
                        src="/icons/ic_hamburger.svg"
                        width={36}
                        height={36}
                        alt="Hamburger Icon"
                        className="cursor-pointer sm:hidden"
                    />
                </SheetTrigger>
                <SheetContent className="border-none bg-dark-1" side="left">
                    <Link href="/" className="flex items-center gap-1">
                        <Image
                            src="/icons/logo.svg"
                            alt="Echomeet Logo"
                            width={32}
                            height={32}
                            className="mr-1 max-sm:size-10"
                        />
                        <p className="text-[26px] font-extrabold text-white">Echomeet</p>
                    </Link>

                    <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
                        <SheetClose asChild>
                            <section className="flex flex-col h-full gap-6 pt-16 text-white">
                                {sidebarLinks.map((link) => {
                                    const isActive = pathname === link.route

                                    return (
                                        <SheetClose asChild key={link.route}>
                                            <Link
                                                key={link.label}
                                                href={link.route}
                                                className={cn(
                                                    "flex gap-4 items-center p-4 rounded-lg w-full max-w-60",
                                                    { "bg-blue-1": isActive }
                                                )}>
                                                <Image
                                                    src={link.imgURL}
                                                    alt={link.label}
                                                    width={20}
                                                    height={20}
                                                />
                                                <p className="font-semibold">{link.label}</p>
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
