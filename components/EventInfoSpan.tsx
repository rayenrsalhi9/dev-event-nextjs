import Image from "next/image"

type EventInfoSpanProps = {
    src: string;
    alt: string;
    key: string;
    value: string;
}

const EventInfoSpan = ({ src, alt, key, value }: EventInfoSpanProps) => {
    return (
        <p className="mt-5 text-[#E7F2FF] text-lg flex items-center">
            <Image src={src} alt={alt} width={24} height={24} className="mr-2" />
            {key}: {value}
        </p>
    )
}

export default EventInfoSpan