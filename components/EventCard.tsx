import Image from "next/image"
import Link from "next/link"
import { IEvent } from "@/database"

type EventCardProps = Pick<IEvent, 'image' | 'title' | 'location' | 'date' | 'time' | 'slug'>

const EventCard = ({ image, title, location, date, time, slug }: EventCardProps) => {
  return (
    <Link href={`/events/${slug}`} className="block">
      <Image 
        src={image} 
        alt={title} 
        width={410} 
        height={300} 
        className="rounded-lg w-full h-auto max-w-full"
        style={{ objectFit: 'cover' }}
      />
      <div className="flex items-center space-x-2 mt-2">
        <Image
          src="/icons/pin.svg"
          alt="location"
          width={12}
          height={12}
          className="sm:w-3.5 sm:h-3.5"
        />
        <p className="text-[#BDBDBD] text-xs sm:text-sm">{location}</p>
      </div>
      <p className="text-white text-lg sm:text-xl font-semibold mt-2">{title}</p>
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center space-x-2">
          <Image
            src="/icons/calendar.svg"
            alt="date"
            width={12}
            height={12}
            className="sm:w-3.5 sm:h-3.5"
          />
          <p className="text-[#BDBDBD] text-xs sm:text-sm">{date}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Image
            src="/icons/clock.svg"
            alt="time"
            width={12}
            height={12}
            className="sm:w-3.5 sm:h-3.5"
          />
          <p className="text-[#BDBDBD] text-xs sm:text-sm">{time}</p>
        </div>
      </div>
    </Link>
  )
}

export default EventCard