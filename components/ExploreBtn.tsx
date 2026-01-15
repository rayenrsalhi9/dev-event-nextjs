import Image from "next/image"

const ExploreBtn = () => {
  return (
    <a href="#events" className="w-fit mx-auto group bg-[#0D161A] text-primary-foreground hover:bg-[#182830] px-6 sm:px-8 py-2 sm:py-3 rounded-full font-medium transition-colors duration-200 mt-5 sm:mt-7 cursor-pointer flex items-center gap-2 text-sm sm:text-base">
      Explore Events
      <Image
        src="/icons/arrow-down.svg"
        alt=""
        width={16}
        height={16}
        className="sm:w-5 sm:h-5 transition-transform duration-200 group-hover:translate-y-0.5"
      />
    </a>
  )
}

export default ExploreBtn
