import Image from "next/image";
import EventInfoSpan from "@/components/EventInfoSpan";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const page = async({ params }: { params: Promise<{slug: string}> }) => {

    const {slug} = await params;
    const res = await fetch(`${BASE_URL}/api/events/${slug}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch event: ${res.status}`);
    }
    const {event} = await res.json();

    return (
        <section className="text-white py-16 px-8 max-w-4xl min-h-screen">
            <div>
                <h1 className="text-6xl font-semibold leading-tight">
                    {event.title}
                </h1>
                <p className="mt-3 text-[#E7F2FF] text-lg">
                    {event.description}
                </p>
            </div>
            <div className="mt-10">
                <Image
                    src={event.image}
                    alt={event.title}
                    width={810}
                    height={457}
                    className="rounded-2xl"
                />
            </div>
            <div className="mt-10">
                <h3 className="text-2xl font-bold leading-tight">Overview</h3>
                <p className="mt-5 text-[#E7F2FF] text-lg">
                    {event.overview}
                </p>
            </div>
            <div className="mt-10">
                <h3 className="text-2xl font-bold leading-tight">Event Details</h3>
                <EventInfoSpan src="/icons/calendar.svg" alt="calendar icon" key="Date" value={event.date} />
                <EventInfoSpan src="/icons/pin.svg" alt="pin icon" key="Venue" value={`${event.venue}, ${event.location}`} />
                <EventInfoSpan src="/icons/clock.svg" alt="clock icon" key="Time" value={event.time} />
                <EventInfoSpan src="/icons/mode.svg" alt="mode icon" key="Mode" value={event.mode} />
                <EventInfoSpan src="/icons/audience.svg" alt="audience icon" key="Audience" value={event.audience} />
            </div>
            <div className="mt-10">
                <h3 className="text-2xl font-bold leading-tight">Agenda</h3>
                <ul className="mt-5">
                {
                    JSON.parse(event.agenda).map((item: string, index: number) => (
                        <li key={index} className="mt-5 text-[#E7F2FF] text-lg flex items-center">
                            <span className="inline-block w-2 h-2 bg-[#E7F2FF] rounded-full mr-3" />
                            {item}
                        </li>
                    ))
                }
            </ul>
            </div>
            <div className="mt-10">
                <h3 className="text-2xl font-bold leading-tight">About the organizer</h3>
                <p className="mt-3 text-[#E7F2FF] text-lg">
                    {event.organizer}
                </p>
            </div>
            <div className="mt-10 flex flex-wrap gap-2">
                {
                    JSON.parse(event.tags).map((tag: string, index: number) => (
                        <span key={index} className="inline-block px-4 py-2 rounded-lg text-[#E7F2FF] bg-[#0D161A]">
                            {tag}
                        </span>
                    ))
                }
            </div>
        </section>
    )
}

export default page