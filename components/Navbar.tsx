import Image from "next/image"
import Link from "next/link"

import MobileNav from "@/components/MobileNav"

export default function Navbar() {
    return (
        <nav className="fixed z-50 w-full px-6 py-4 flex-between bg-dark-1 lg:px-10">
            <Link href="/" className="flex items-center gap-1">
                <Image
                    src="/icons/logo.svg"
                    alt="Echomeet Logo"
                    width={32}
                    height={32}
                    className="mr-1 max-sm:size-10"
                />
                <p className="text-[26px] font-extrabold text-white max-sm:hidden">Echomeet</p>
            </Link>

            <div className="gap-5 flex-between">
                {/* Clerk - User Management */}
                <MobileNav />
            </div>
        </nav>
    )
}
