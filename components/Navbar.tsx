import Image from "next/image"
import Link from "next/link"

const Navbar = () => {
  return (
    <header className="bg-[#12121280] backdrop-blur-xl border-b border-b-[#151024] px-8 ">
      <nav className="flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 py-4">
          <Image
            src="/icons/logo.png"
            alt="logo"
            width={24}
            height={24}
          />
          <p className="text-white italic font-bold text-lg hidden md:block">DevEvent</p>
        </Link>
        <ul className="flex items-center space-x-8 text-[#DCFFF8]">
          <li>
            <Link href="/" className="py-4">Home</Link>
          </li>
          <li>
            <Link href="/events" className="py-4">Events</Link>
          </li>
          <li>
            <Link href="/create-event" className="py-4">Create Event</Link>
          </li>
        </ul>      </nav>
    </header>
  )
}

export default Navbar