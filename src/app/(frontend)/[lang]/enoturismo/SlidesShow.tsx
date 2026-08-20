'use client'
import React, { useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'

import { Button } from '@/components/Button'
import { ArrowLeft, ArrowRight, IconWhats } from '@/components/SVGS'
import { Media } from '@/payload/payload-types'

export const SlidesShow = ({ roteiros }: any) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({})

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {roteiros.map((roteiro: any) => {
            const image = roteiro.imagem as Media
            return (
              <div key={roteiro.id} className="embla__slide">
                <div className="absolute w-[90%] h-[269px] -top-[135px] sm:w-full">
                  <Image src={image.url} fill alt="" className="object-cover" />
                </div>
                <span className="text-[#1E1E1E] font-grotesk text-base font-bold">
                  {roteiro.titulo}
                </span>
                <p className="text-[#1E1E1E] font-grotesk text-[25px] font-bold leading-[30px] max-w-[289px] mt-[20px]">
                  {roteiro.descricao}
                </p>
                <ul className="flex flex-col gap-[20px] mt-[40px]">
                  {roteiro.lista?.map((_: any) => (
                    <li
                      key={_.id}
                      className="h-[50px] max-w-[254px] border-b-[2px] border-[#CEC4C5;]"
                    >
                      {_.titulo}
                    </li>
                  ))}
                </ul>
                <a href={roteiro.linkBotao} target="_blank">
                  <Button className="flex items-center justify-center gap-3 w-[270px] h-[60px] bg-[#E97230] rounded-lg text-white font-grotesk text-xl mt-[60px] sm:w-[200px] transition-all">
                    Reserve agora
                  </Button>
                </a>
              </div>
            )
          })}
        </div>
      </div>

      <button className="embla__prev" onClick={scrollPrev}>
        <ArrowLeft />
      </button>
      <button className="embla__next" onClick={scrollNext}>
        <ArrowRight />
      </button>
    </section>
  )
}
