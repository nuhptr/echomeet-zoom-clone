import UpcomingCallList from "@/components/UpcomingCallList"

export default function Previous() {
    return (
        <section className="flex flex-col gap-10 text-white size-full">
            <h1 className="text-3xl font-bold">Previous</h1>

            <UpcomingCallList type="ended" />
        </section>
    )
}
