'use client'

import { useCallback, useEffect, useState } from 'react'
import type { EmblaCarouselType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

import RichText from './RichText'
import { ArrowLeft, ArrowRight } from './SVGS'

export function SlidesOrigem({ data, selo }: any) {
  const [emblaRef, emblaApi] = useEmblaCarousel({})
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true)

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList())
  }, [])

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!emblaApi) return
      emblaApi.scrollTo(index)
    },
    [emblaApi],
  )

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [])

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollPrev()
  }, [emblaApi])

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollNext()
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return

    onInit(emblaApi)
    onSelect(emblaApi)
    emblaApi.on('reInit', onInit).on('reInit', onSelect).on('select', onSelect)
  }, [emblaApi, onInit, onSelect])

  if (!Array.isArray(data) || data.length === 0) {
    return null
  }

  return (
    <div className="w-screen flex items-center justify-center mt-[93px] md:flex-col md:h-fit">
      <div className="relative w-[240px] h-[240px] -mr-32 -mt-56 z-20 md:-mr-0 md:-mt-0 md:z-20 1366p:w-[180px] 1366p:h-[180px]">
        <Image src={selo?.url || ''} fill alt="" quality={100} className="object-cover z-40" />
      </div>
      <div className="flex flex-col gap-20 w-full max-w-[1313px] px-8">
        <div className="embla__origem inline-block w-full" ref={emblaRef}>
          <div className="embla__container__origem">
            {data.map((origem: any) => (
              <div key={origem.id} className="embla__slide__origem flex justify-center gap-10 md:flex-col md:items-center">
                <span className="font-bold text-[350px] max-w-[470px] break-words leading-[265px] font-rasbern pt-12 text-[#E5E4DF] md:text-[60px] md:leading-4">
                  {origem.anoOrigem}
                </span>
                <div className="relative w-[464px] h-[585px] -ml-44 md:-ml-0 md:w-[300px] md:h-[400px]">
                  <Image
                    src={origem?.imagem?.url || ''}
                    alt=""
                    fill
                    quality={100}
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-5 max-w-[305px] mt-[116px] md:mt-0 md:max-w-full">
                  <span className="font-bold text-3xl font-grotesk leading-9 text-[#E97230]">
                    {origem.titulo}
                  </span>
                  <RichText
                    content={origem.descricao}
                    components={{
                      p: ({ ...props }) => (
                        <p className="text-[#1E1E1E] text-xl leading-6 font-grotesk" {...props} />
                      ),
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full flex justify-between gap-11 relative after:absolute after:top-2 z-10 after:left-0 after:w-full after:bg-[#E97230] after:h-1">
          {scrollSnaps.map((_, index: number) => {
            return (
              <div
                className="flex items-center justify-end flex-col gap-[10px] z-20 h-[60px] cursor-pointer"
                onClick={() => onDotButtonClick(index)}
              >
                <div
                  className={twMerge(
                    'w-6 h-6 bg-[#E97230] rounded-full opacity-100 transition-all',
                    index !== selectedIndex && 'opacity-0',
                  )}
                />
                <span
                  className={twMerge(
                    'text-lg font-grotesk text-[#E97230] transition-all',
                    index !== selectedIndex && 'text-[#CCCCCC]',
                  )}
                >
                  {data[index].anoOrigem}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
