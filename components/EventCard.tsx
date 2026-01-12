import Image from "next/image"
import Link from "next/link"
import type { EventCardProps } from "@/lib/constants"

const EventCard = ({ image, title, location, date, time, slug }: EventCardProps) => {
  return (
    <Link href={`/events/${slug}`}>
      <Image 
        src={image} 
        alt={title} 
        width={410} 
        height={300} 
        className="rounded-lg"
      />
      <div className="flex items-center space-x-2 mt-2">
        <Image
          src="/icons/pin.svg"
          alt="location"
          width={14}
          height={14}
        />
        <p className="text-[#BDBDBD] text-sm">{location}</p>
      </div>
      <p className="text-white text-xl font-semibold mt-2">{title}</p>
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center space-x-2">
          <Image
            src="/icons/calendar.svg"
            alt="date"
            width={14}
            height={14}
          />
          <p className="text-[#BDBDBD] text-sm">{date}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Image
            src="/icons/clock.svg"
            alt="time"
            width={14}
            height={14}
          />
          <p className="text-[#BDBDBD] text-sm">{time}</p>
        </div>
      </div>
    </Link>
  )
}

export default EventCard