export type EventCardProps = {
  image: string,
  title: string,
  location: string,
  date: string,
  time: string,
  slug: string,
}

export const events = [
  {
    image: "/images/event1.png",
    title: "React Conf 2025",
    location: "San Francisco, CA",
    date: "March 15-16, 2025",
    time: "9:00 AM - 6:00 PM",
    slug: "react-conf-2025"
  },
  {
    image: "/images/event2.png",
    title: "Google I/O Extended",
    location: "New York, NY",
    date: "April 20, 2025",
    time: "10:00 AM - 4:00 PM",
    slug: "google-io-extended-2025"
  },
  {
    image: "/images/event3.png",
    title: "AWS re:Invent",
    location: "Las Vegas, NV",
    date: "May 12-15, 2025",
    time: "8:00 AM - 7:00 PM",
    slug: "aws-reinvent-2025"
  },
  {
    image: "/images/event4.png",
    title: "Microsoft Build",
    location: "Seattle, WA",
    date: "June 3-5, 2025",
    time: "9:00 AM - 5:00 PM",
    slug: "microsoft-build-2025"
  },
  {
    image: "/images/event5.png",
    title: "TechCrunch Disrupt",
    location: "Austin, TX",
    date: "July 18-20, 2025",
    time: "8:30 AM - 6:30 PM",
    slug: "techcrunch-disrupt-2025"
  },
  {
    image: "/images/event6.png",
    title: "DevOps Days",
    location: "Chicago, IL",
    date: "August 25-26, 2025",
    time: "9:00 AM - 4:00 PM",
    slug: "devops-days-chicago-2025"
  }
];