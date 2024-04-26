import { ReactNode } from "react"

import { StreamVideoProvider } from "@/providers/StreamClientProviders"

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
   return (
      <main>
         <StreamVideoProvider>{children}</StreamVideoProvider>
      </main>
   )
}
