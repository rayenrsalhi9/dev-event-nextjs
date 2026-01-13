import ExploreBtn from "@/components/ExploreBtn";
import EventCard from "@/components/EventCard";
import { IEvent } from "@/database";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const page = async () => {

  let events: IEvent[] = [];

  try {
    const res = await fetch(`${BASE_URL}/api/events`);
    const {events: eventsData} = await res.json();
    events = eventsData || [];
  } catch (error) {
    console.error("Error fetching events:", error);
  }

  return (
    <section className="text-white py-16 px-8 max-w-6xl mx-auto">
      <h1 className="text-center text-6xl font-bold leading-tight bg-linear-to-b from-white to-[#00cbff] bg-clip-text text-transparent">
        The Hub for Every Dev <br /> Event You Can&apos;t Miss
      </h1>
      <p className="mt-3 text-center text-[#E7F2FF] text-lg">
        Hackathons, Meetups, and Conferences, All in One Place
      </p>
      <ExploreBtn />

      <div className="mt-20 space-y-7">
        <h3 className="text-2xl font-bold leading-tight">Featured Events</h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {
            events && events.length > 0 ?
            events.map((event: IEvent) => (
              <li key={event.slug}>
                <EventCard {...event} />
              </li>
            )) : (
              <li className="col-span-3">
                <p className="text-center text-[#E7F2FF] text-lg">No events available at the moment.</p>
              </li>
            )
          }
        </ul>
      </div>
    </section>
  )
}

export default page