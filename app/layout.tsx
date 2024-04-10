import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs"

import { Toaster } from "@/components/ui/toaster"

import "./globals.css"
// for apply the styles of the video-react-sdk
import "@stream-io/video-react-sdk/dist/css/styles.css"
// for apply react-datepicker styles
import "react-datepicker/dist/react-datepicker.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Echomeet | Next generation video conferencing",
    description:
        "Echomeet is a next generation video conferencing platform built from modern tech.",
    icons: {
        icon: "/icons/logo.svg",
    },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <ClerkProvider
                appearance={{
                    layout: {
                        logoImageUrl: "/icons/ic_yoom_logo.svg",
                        socialButtonsVariant: "iconButton",
                    },
                    variables: {
                        colorText: "#fff",
                        colorPrimary: "#0E78F9",
                        colorBackground: "#1c1f2e",
                        colorInputBackground: "#252a41",
                        colorInputText: "#fff",
                    },
                }}>
                <body
                    className={`${inter.className} bg-dark-2 no-scrollbar`}
                    suppressHydrationWarning={true}>
                    {children}
                    <Toaster />
                </body>
            </ClerkProvider>
        </html>
    )
}
