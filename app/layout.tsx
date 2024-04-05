import type { Metadata } from "next"
import { Inter } from "next/font/google"

import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Echomeet | Next generation video conferencing",
    description:
        "Echomeet is a next generation video conferencing platform that is built for the modern web.",
    icons: {
        icon: "/icons/logo.svg",
    },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className={`${inter.className} bg-dark-2`} suppressHydrationWarning={true}>
                {children}
            </body>
        </html>
    )
}
