'use client'

import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

import { Swiper, SwiperSlide } from '@/components/Swiper'
import { Media } from '@/payload/payload-types'
import { ArrowLeftMoment, ArrowRightMoment } from './SVGS'

export function SlidesMomentos({ data }: any) {
  if (!data?.slidesMomentos?.length) {
    return null
  }
  return (
    <div className="w-screen bg-[#E97230] h-[500px] mt-[254px] pl-[234px] relative md:h-[1000px] md:pl-8 md:pr-8 md:mt-[254px]">
      <div className="flex items-center justify-end gap-14 absolute -top-[135px] right-0 md:flex-col md:justify-center md:items-center md:static md:text-center md:top-0">
        <div className="flex flex-col mt-32 md:items-center md:mt-8">
          <span className="text-white font-bold font-grotesk leading-7">{data.titulo}</span>
          <span className="text-6xl font-grotesk text-white max-w-[383px]">{data.chamada}</span>
          <span className="text-xl font-grotesk leading-6 text-white mt-3 max-w-[264px]">
            {data.descricao}
          </span>
        </div>
        <div className="flex flex-col gap-4">
          <Swiper
            spaceBetween={10}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              1280: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
            }}
            className="w-full max-w-[1246px] min-h-[508px] 1xl:max-w-[900px] lg:max-w-[500px] md:max-w-[400px]"
            slideActiveClass="active__momento"
            slideClass="slide__momento"
          >
            {data?.slidesMomentos.map((_: any, idx: any) => {
              const image = _.imagem as Media
              if (!data.slidesMomentos.length) {
                return
              }
              return (
                <SwiperSlide key={idx}>
                  <div
                    className={twMerge(
                      'relative h-[310px] 1xl:w-[370px] 1xl:h-[300px] sm:w-[90%] transition-all',
                      idx === data?.slidesMomentos?.length - 1 && 'h-[508px]',
                    )}
                    id="image_legado"
                  >
                    <Image src={image?.url || ''} fill alt="" className="object-cover" />
                  </div>
                </SwiperSlide>
              )
            })}
          </Swiper>
          {/* <div className="flex items-center gap-2 md:order-1">
            <ArrowLeftMoment id="momento-prev" />
            <ArrowRightMoment id="momento-next" />
          </div> */}
        </div>
      </div>
    </div>
  )
}
