import { useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { IoMdArrowDropright, IoMdArrowDropleft } from 'react-icons/io'

export default function EmblaCarousel({ children, title }) {
    const [emblaRef, emblaApi] = useEmblaCarousel()
    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])
    return (
        <>
        <div className="mb-8 flex w-full items-center justify-between border-b border-black">
            <div className="mb-3 text-2xl">{title}</div>
            <div className="space-x-5 text-4xl">
            <button className="embla__prev" onClick={scrollPrev}>
                <IoMdArrowDropleft />
            </button>
            <button className="embla__next" onClick={scrollNext}>
                <IoMdArrowDropright />
            </button>
            </div>
        </div>
        <div className="embla" ref={emblaRef}>
            <div className="embla__container">{children}</div>
        </div>
        </>
    )
}
