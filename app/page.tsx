import ExploreBtn from "@/components/ExploreBtn";

const page = () => {
  return (
    <section className="text-center text-white py-16 px-4 mx-auto">
      <h1 className="text-6xl font-bold leading-tight bg-linear-to-b from-white to-[#00cbff] bg-clip-text text-transparent">
        The Hub for Every Dev <br /> Event You Can&apos;t Miss
      </h1>
      <p className="mt-3 text-[#E7F2FF] text-lg">
        Hackathons, Meetups, and Conferences, All in One Place
      </p>
      <ExploreBtn />
    </section>
  )
}

export default page