import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs"

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
                </body>
            </ClerkProvider>
        </html>
    )
}
