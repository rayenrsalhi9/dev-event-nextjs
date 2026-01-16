import ExploreBtn from "@/components/ExploreBtn";
import EventCard from "@/components/EventCard";
import { IEvent } from "@/database";
import { cacheLife } from "next/cache";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const page = async () => {

  'use cache'
  cacheLife('hours')

  if (!BASE_URL) {
    throw new Error("NEXT_PUBLIC_BASE_URL is not defined");
  }

  const events: IEvent[] = [];

  // try {
  //   const res = await fetch(`${BASE_URL}/api/events`);
  //   if (!res.ok) {
  //     throw new Error(`Failed to fetch events: ${res.status}`);
  //   }
  //   const {events: eventsData} = await res.json();
  //   events = eventsData || [];
  // } catch (error) {
  //   console.error("Error fetching events:", error);
  // }

  return (
    <section className="text-white py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <h1 className="text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight bg-gradient-to-b from-white to-[#00cbff] bg-clip-text text-transparent">
        The Hub for Every Dev <br /> Event You Can&apos;t Miss
      </h1>
      <p className="mt-3 text-center text-[#E7F2FF] text-base sm:text-lg">
        Hackathons, Meetups, and Conferences, All in One Place
      </p>
      <ExploreBtn />

      <div className="mt-12 sm:mt-16 md:mt-20 space-y-6 sm:space-y-7">
        <h3 className="text-xl sm:text-2xl font-bold leading-tight">Featured Events</h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-7">
          {
            events && events.length > 0 ?
            events.map((event: IEvent) => (
              <li key={event.slug}>
                <EventCard {...event} />
              </li>
            )) : (
              <li className="col-span-1 sm:col-span-2 lg:col-span-3">
                <p className="text-center text-[#E7F2FF] text-base sm:text-lg">No events available at the moment.</p>
              </li>
            )
          }
        </ul>
      </div>
    </section>
  )
}

export default page