/* eslint-disable import/extensions */
'use client'
import { useCallback, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'

import { ArrowLeft, ArrowRight } from './SVGS'

import { FormatImage } from '@/lib/FormatImage'
import { Legado } from '@/payload/payload-types'

interface iSlidesOnline {
  data: Pick<Legado, 'secaoOnline'>
}

export function SlidesOnline({ data }: iSlidesOnline) {
  const [emblaRef, emblaApi] = useEmblaCarousel({})
  const [slideIndex, setSlideIndex] = useState(0)

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  if (!data?.secaoOnline?.episodios?.length) {
    return null
  }

  return (
    <div className="w-screen max-w-[1528px] px-8 m-auto mt-[145px] flex flex-col items-center mb-[146px]">
      <div className="flex items-end justify-center flex-wrap gap-24">
        <div className="flex flex-col sm:text-center">
          <span className="text-xl font-bold font-grotesk leading-7 text-[#CEC4C5]">
            {data.secaoOnline.titulo}
          </span>
          <span className="text-6xl font-grotesk uppercase tracking-[12px] text-[#181818]">
            Da lavoura <br /> ao <strong className="text-[#E97230] font-bold">digital</strong>
          </span>
        </div>
        <p className="max-w-[384px] text-lg leading-snug text-[#1E1E1E] font-grotesk lg:text-center">
          {data.secaoOnline.descricao}
        </p>
      </div>
      <div className="w-full max-w-[1240px] mt-[84px] mb-[115px] gap-7 flex items-end justify-end translate-x-14 lg:translate-x-0 lg:flex-col lg:items-center lg:justify-center lg:gap-6 lg:h-fit">
        {data.secaoOnline.episodios[slideIndex].blockType === 'url_episodio' ? (
          <iframe
            className="w-full max-w-[1032px] h-[489px] lg:max-w-[600px] lg:h-fit"
            //@ts-ignore
            src={data.secaoOnline.episodios[slideIndex].url}
            title="YouTube video player"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        ) : (
          <video
            //@ts-ignore
            src={FormatImage(data.secaoOnline.episodios[slideIndex].video).url}
            //@ts-ignore
            poster={FormatImage(data.secaoOnline.episodios[slideIndex].capa).url}
            className="w-full max-w-[1032px] h-[489px] lg:max-w-[600px] lg:h-fit object-cover"
          />
        )}

        <div className="max-w-[180px] flex flex-col lg:text-center lg:max-w-full">
          <span className="text-[#E97230] text-3xl font-grotesk leading-9">
            {data.secaoOnline.episodios[slideIndex].titulo}
          </span>
          <span className="text-[#1E1E1E] text-3xl font-grotesk font-bold leading-9">
            {data.secaoOnline.episodios[slideIndex].chamada}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-7 w-full sm:relative">
        <button
          className="embla__prev sm:absolute sm:z-10 sm:-bottom-14 sm:right-1/2"
          onClick={scrollPrev}
        >
          <ArrowLeft className="cursor-pointer" />
        </button>
        <div className="embla__online w-full" ref={emblaRef}>
          <div className="embla__container__online">
            {data.secaoOnline.episodios.map((ep, index: number) => {
              if (ep.blockType === 'url_episodio') {
                return (
                  <div
                    key={index}
                    className="embla__slide__online flex flex-col cursor-pointer w-full relative"
                    onClick={() => setSlideIndex(index)}
                  >
                    <div className="relative w-full h-[196px]">
                      <Image
                        //@ts-ignore
                        src={FormatImage(ep.capa).url}
                        alt=""
                        fill
                        className="mb-4 object-cover"
                      />
                    </div>

                    <span className="text-xl leading-snug font-grotesk text-[#E97230]">
                      {ep.titulo}
                    </span>
                    <span className="text-xl font-grotesk text-[#1E1E1E] font-bold leading-snug">
                      {ep.chamada}
                    </span>
                  </div>
                )
              }

              return (
                <div
                  key={index}
                  className="embla__slide__online flex flex-col cursor-pointer w-full relative"
                  onClick={() => setSlideIndex(index)}
                >
                  <div className="relative w-full h-[196px]">
                    <Image
                      //@ts-ignore
                      src={FormatImage(ep.capa).url}
                      alt=""
                      fill
                      className="mb-4 object-cover"
                    />
                  </div>

                  <span className="text-xl leading-snug font-grotesk text-[#E97230]">
                    {ep.titulo}
                  </span>
                  <span className="text-xl font-grotesk text-[#1E1E1E] font-bold leading-snug">
                    {ep.chamada}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
        <button
          className="embla__next  sm:absolute sm:z-10 sm:-bottom-14 sm:left-1/2"
          onClick={scrollNext}
        >
          <ArrowRight className="cursor-pointer" />
        </button>
      </div>
    </div>
  )
}
