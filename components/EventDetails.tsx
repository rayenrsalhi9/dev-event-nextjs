import { cacheLife } from "next/cache";
import Image from "next/image";
import type { IEvent } from "@/database";
import EventInfoSpan from "@/components/EventInfoSpan";
import EventBookingCta from "@/components/EventBookingCta";
import { getSimilarEventsBySlug } from "@/lib/actions/event.actions";
import EventCard from "@/components/EventCard";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
if (!BASE_URL) throw new Error("Environment variable is not configured");

export const EventDetails = async ({ params }: { params: Promise<string> }) => {

    'use cache'
    cacheLife('hours')

    const slug = await params;
    if (!/^[a-zA-Z0-9_-]+$/.test(slug)) throw new Error("Invalid slug format");

    const res = await fetch(`${BASE_URL}/api/events/${slug}`, {
        next: { revalidate: 3600 }, // or { cache: 'force-cache' } for static
        signal: AbortSignal.timeout(5000), // 5 second timeout
    });
    if (!res.ok) throw new Error(`Failed to fetch event ${slug}: ${res.status}`);

    const { event } = await res.json();
    const similarEvents = await getSimilarEventsBySlug(slug);

    return (
        <section className="text-white py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 w-full max-w-6xl mx-auto min-h-screen">
            <div className="w-full max-w-full md:max-w-[800px]">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight">
                    {event.title}
                </h1>
                <p className="mt-3 text-[#E7F2FF] text-base sm:text-lg">
                    {event.description}
                </p>
            </div>
            <div className="mt-8 sm:mt-10 flex flex-col lg:flex-row justify-between items-start gap-6 lg:gap-10">
                <div className="w-full">
                    <Image
                        src={event.image}
                        alt={event.title}
                        width={810}
                        height={457}
                        className="rounded-2xl w-full h-auto max-w-full md:max-w-[810px]"
                        style={{ objectFit: 'cover' }}
                    />
                </div>
                <div className="w-full lg:w-auto lg:shrink-0">
                    <EventBookingCta eventId={event._id} eventSlug={event.slug} />
                </div>
            </div>
            <div className="mt-8 sm:mt-10 w-full max-w-full md:max-w-[800px]">
                <h3 className="text-xl sm:text-2xl font-bold leading-tight">Overview</h3>
                <p className="mt-4 sm:mt-5 text-[#E7F2FF] text-base sm:text-lg">
                    {event.overview}
                </p>
            </div>
            <div className="mt-8 sm:mt-10 w-full max-w-full md:max-w-[800px]">
                <h3 className="text-xl sm:text-2xl font-bold leading-tight">Event Details</h3>
                <EventInfoSpan src="/icons/calendar.svg" alt="calendar icon" label="Date" value={event.date} />
                <EventInfoSpan src="/icons/pin.svg" alt="pin icon" label="Venue" value={`${event.venue}, ${event.location}`} />
                <EventInfoSpan src="/icons/clock.svg" alt="clock icon" label="Time" value={event.time} />
                <EventInfoSpan src="/icons/mode.svg" alt="mode icon" label="Mode" value={event.mode} />
                <EventInfoSpan src="/icons/audience.svg" alt="audience icon" label="Audience" value={event.audience} />
            </div>
            <div className="mt-8 sm:mt-10 w-full max-w-full md:max-w-[800px]">
                <h3 className="text-xl sm:text-2xl font-bold leading-tight">Agenda</h3>
                <ul className="mt-4 sm:mt-5">
                    {
                        event.agenda?.map((item: string, index: number) => (
                            <li key={index} className="mt-3 sm:mt-5 text-[#E7F2FF] text-base sm:text-lg flex items-center">
                                <span className="inline-block w-2 h-2 bg-[#E7F2FF] rounded-full mr-3" />
                                {item}
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className="mt-8 w-full max-w-full md:max-w-[800px]">
                <h3 className="text-xl sm:text-2xl font-bold leading-tight">About the organizer</h3>
                <p className="mt-3 text-[#E7F2FF] text-base sm:text-lg">
                    {event.organizer}
                </p>
            </div>
            <div className="mt-8 sm:mt-10 flex flex-wrap gap-2 w-full max-w-full md:max-w-[800px]">
                {
                    event.tags?.map((tag: string, index: number) => (
                        <span key={index} className="inline-block px-3 sm:px-4 py-2 rounded-lg text-[#E7F2FF] bg-[#0D161A] text-sm sm:text-base">
                            {tag}
                        </span>
                    ))
                }
            </div>
            <div className="mt-8 sm:mt-10 w-full max-w-full md:max-w-[800px]">
                <h3 className="text-xl sm:text-2xl font-bold leading-tight">Similar Events</h3>
                <ul className="mt-4 sm:mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {
                        similarEvents?.length > 0 ?
                            similarEvents?.map((event: IEvent) => (
                                <li key={event.slug}>
                                    <EventCard {...event} />
                                </li>
                            )) : (
                                <li className="col-span-1 sm:col-span-2 lg:col-span-3">
                                    <p className="text-[#E7F2FF] text-base sm:text-lg">No similar events available at the moment.</p>
                                </li>
                            )
                    }
                </ul>
            </div>
        </section>
    )
}