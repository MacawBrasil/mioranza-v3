'use client'

// import Swiper core and required modules
import Image from 'next/image'
import { A11y, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { cn } from '@/lib/utils'
import { Media } from '@/payload/payload-types'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'

export function SwiperLegado(props: any) {
  return (
    <Swiper
      modules={[A11y, Navigation]}
      breakpoints={{
        0: {
          slidesPerView: 1.2,
          spaceBetween: 10,
        },
        1280: {
          slidesPerView: 2.5,
          spaceBetween: 30,
        },
      }}
      navigation={{
        enabled: true,
        prevEl: '#legado-prev',
        nextEl: '#legado-next',
      }}
      className="w-full xl:w-[95%] h-fit after:absolute after:bottom-0 after:left-0 after:w-full after:h-[10px] after:bg-[#E97230] "
    >
      {props.data.map((_, idx) => {
        const image = _.imagem as Media
        return (
          <SwiperSlide key={idx}>
            <div className="w-full pb-[50px] flex flex-col gap-[50px] overflow-hidden">
              <div
                className="relative w-full h-[400px] 1xl:h-[300px] overflow-hidden"
                id="image_legado"
              >
                <Image src={image.url} fill alt="" className="object-cover" />
              </div>
              <p className={cn('text-[#E97230] text-xl font-grotesk max-w-[300px] md:max-w-[90%]')}>
                {_.descricao}
              </p>
            </div>
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}
