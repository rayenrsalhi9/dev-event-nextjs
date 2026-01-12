import Image from "next/image"

const ExploreBtn = () => {
  return (
    <button className="group bg-[#0D161A] text-primary-foreground hover:bg-[#182830] px-8 py-3 rounded-full font-medium transition-colors duration-200 flex items-center gap-2 mx-auto mt-7 cursor-pointer">
      Explore Events
      <Image
        src="/icons/arrow-down.svg"
        alt="arrow-down"
        width={20}
        height={20}
        className="transition-transform duration-200 group-hover:translate-y-0.5"
      />
    </button>
  )
}

export default ExploreBtn
