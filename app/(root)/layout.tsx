import { Metadata } from "next"

import { StreamVideoProvider } from "@/providers/StreamClientProviders"

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
        <main>
            <StreamVideoProvider>{children}</StreamVideoProvider>
        </main>
    )
}
