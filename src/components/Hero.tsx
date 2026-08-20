'use client'
import Image from 'next/image'
import Link from 'next/link'
import { A11y, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { Locale } from '@/lib/locale'
import { cn } from '@/lib/utils'
import { Home, Media } from '@/payload/payload-types'
import { Button } from './Button'
import { HeaderMobile } from './HeaderMobile'
import { Navbar } from './Navbar'
import { Arrow, LogoWhats } from './SVGS'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

interface iHero {
  data: Home | null
  loja: string | null | undefined
  whats: string | null | undefined
  lang: Locale
}

export function Hero({ data, loja, lang, whats }: iHero) {
  return (
    <div className="relative w-screen h-[1080px] flex items-center sm:h-screen" id="hero">
      <a href={`https://wa.me/${whats?.replace(/\D/g, '')}`} target="_blank">
        <LogoWhats className="absolute right-[160px] top-1/2 z-20 sm:right-10 sm:top-3/4 sm:w-12" />
      </a>
      <Arrow className="absolute z-20 bottom-[40px] left-1/2 -translate-x-1/2 md:w-[30px] md:bottom-4 sm:hidden" />

      <Navbar loja={loja} lang={lang} />
      <HeaderMobile loja={loja} lang={lang} />
      <Swiper
        modules={[Pagination, A11y]}
        slidesPerView={1}
        spaceBetween={0}
        pagination={{
          enabled: true,
          clickable: true,
        }}
        className="w-full h-full z-10 swiper-hero"
      >
        {data?.Slides?.map((content, idx) => {
          if (content.blockType === 'image_slide') {
            const image = content.banner as Media
            return (
              <SwiperSlide key={idx}>
                <Image
                  key={idx}
                  src={image.url || '/banner-home.png'}
                  fill
                  alt="banner"
                  className="object-cover -z-10"
                />

                <div className="pl-[238px] flex flex-col gap-[166px] w-full max-w-[810px] pt-60 md:px-5 md:gap-10 md:-translate-y-20 1xl:pl-[100px] lg:gap-4 md:pt-80">
                  <div className="flex flex-col items-start gap-[52px] sm:w-full sm:items-center sm:text-center">
                    <span
                      className={cn(
                        'text-[100px] text-white leading-[100px] tracking-[10px] font-grotesk font-bold sm:text-3xl lg:text-7xl',
                      )}
                    >
                      {content?.titulo}
                    </span>
                    <Link href={`/${lang}${content.botao}`}>
                      <Button
                        className={cn(
                          'w-[200.10px] h-[60px] bg-zinc-300 bg-opacity-20 rounded-lg backdrop-blur-[80px] text-white font-grotesk transition-all hover:bg-transparent hover:border',
                        )}
                      >
                        {content.textoBotao}
                      </Button>
                    </Link>
                  </div>
                  <p
                    className={cn(
                      `text-white text-[20px] leading-[28px] max-w-[500px] font-grotesk md:max-w-[350px] sm:max-w-full sm:text-center`,
                    )}
                  >
                    {content?.descricao}
                  </p>
                </div>
              </SwiperSlide>
            )
          } else {
            const video = content.video as Media
            return (
              <SwiperSlide key={idx}>
                <video
                  className="absolute top-0 left-0 w-full h-full object-cover object-center"
                  src={video.url ?? undefined}
                  poster="/banner-home.png"
                  muted
                  autoPlay
                  loop
                ></video>

                {content.ativarTexto && (
                  <div className="pl-[238px] flex flex-col gap-[166px] w-full max-w-[810px] pt-60 md:px-5 md:gap-10 md:-translate-y-20 1xl:pl-[100px] lg:gap-4 md:pt-80">
                    <div className="flex flex-col items-start gap-[52px] sm:w-full sm:items-center sm:text-center">
                      <span
                        className={cn(
                          'text-[100px] text-white leading-[100px] tracking-[10px] font-grotesk font-bold sm:text-3xl lg:text-7xl',
                        )}
                      >
                        {content?.titulo}
                      </span>
                      <Link href={`/${lang}${content.botao}`}>
                        <Button
                          className={cn(
                            'w-[200.10px] h-[60px] bg-zinc-300 bg-opacity-20 rounded-lg backdrop-blur-[80px] text-white font-grotesk',
                          )}
                        >
                          {content.textoBotao}
                        </Button>
                      </Link>
                    </div>
                    <p
                      className={cn(
                        `text-white text-[20px] leading-[28px] max-w-[500px] font-grotesk md:max-w-[350px] sm:max-w-full sm:text-center`,
                      )}
                    >
                      {content?.descricao}
                    </p>
                  </div>
                )}
              </SwiperSlide>
            )
          }
        })}
      </Swiper>
      <div className="swiper-pagination absolute bottom-[152px] right-[160px] z-30 sm:right-14 sm:bottom-11"></div>
    </div>
  )
}
