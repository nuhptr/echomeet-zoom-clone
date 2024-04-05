import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"

export default function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="relative">
            <Navbar />

            <div className="flex">
                <Sidebar />
                <section className="flex flex-col flex-1 min-h-screen px-6 pb-6 pt-28 max-md:pb-14 sm:px-14">
                    <div className="w-full">{children}</div>
                </section>
            </div>
        </main>
    )
}
