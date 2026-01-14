import Image from "next/image"

type EventInfoSpanProps = {
    src: string;
    alt: string;
    label: string;
    value: string;
}

const EventInfoSpan = ({ src, alt, label, value }: EventInfoSpanProps) => {
    return (
        <p className="mt-4 sm:mt-5 text-[#E7F2FF] text-base sm:text-lg flex items-center">
            <Image src={src} alt={alt} width={20} height={20} className="mr-2 sm:w-6 sm:h-6" />
            <span className="wrap-break-words">{label}: {value}</span>
        </p>
    )
}

export default EventInfoSpan