import Image from "next/image"

type EventInfoSpanProps = {
    src: string;
    alt: string;
    label: string;
    value: string;
}

const EventInfoSpan = ({ src, alt, label, value }: EventInfoSpanProps) => {
    return (
        <p className="mt-5 text-[#E7F2FF] text-lg flex items-center">
            <Image src={src} alt={alt} width={24} height={24} className="mr-2" />
            {label}: {value}
        </p>
    )
}

export default EventInfoSpan