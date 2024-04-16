import CallList from "@/components/CallList"

const Upcoming = () => {
   return (
      <section className="flex flex-col gap-10 text-white size-full">
         <h1 className="text-3xl font-bold">Upcoming</h1>

         <CallList type="upcoming" />
      </section>
   )
}

export default Upcoming
