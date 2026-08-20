'use client'
import { useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import Link from 'next/link'

import { formatDate } from '@/lib/FormatDate'
import { Locale } from '@/lib/locale'
import { Home, Media, Post } from '@/payload/payload-types'
import { Button } from './Button'
import RichText from './RichText'
import { ArrowLeft, ArrowRight } from './SVGS'

import './stylesCarouselBlog.css'

interface iCarouselBlog {
  home: Home | null
  data: Post[] | null
  lang: Locale
}

export function CarouselBlog({ home, data, lang }: iCarouselBlog) {
  const [emblaRef, emblaApi] = useEmblaCarousel({})

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <div className="w-screen flex items-start flex-wrap gap-[100px] mt-[389px] pl-[50px] h-[900px] 1xl:gap-[50px] 1xl:pl-[28px] xl:justify-between md:justify-center md:px-2 md:h-[1600px] md:gap-5 md:mt-0 lg:pl-8 lg:gap-[60px] sm:px-0 sm:h-auto sm:pb-16">
      <div className="flex flex-col max-w-[472px] pl-10 md:pl-0 md:items-center md:text-center">
        <span className="text-[#CEC4C5] text-xl font-grotesk font-bold">
          {home?.secaoBlog?.titulo}
        </span>
        <span className="font-grotesk text-[60px] leading-[60px] uppercase sm:text-4xl">
          Histórias <br />e <strong className="font-bold text-[#E97230]">sabores</strong>
        </span>
        <RichText
          components={{
            p: ({ ...props }) => (
              <p
                className="tex-[#1E1E1E] font-grotesk text-lg mt-[60px] max-w-[384px]"
                {...props}
              />
            ),
          }}
          content={home?.secaoBlog?.descricao}
        />
        <Link href={`/${lang}/blog`}>
          <Button className="mt-[60px] w-[200px] h-[60px] bg-black rounded-lg text-white font-grotesk font-normal text-xl transition-all hover:bg-transparent hover:border hover:border-black hover:text-black">
            Conheça mais
          </Button>
        </Link>

        <div className="flex items-center gap-0 mt-[120px]">
          <ArrowLeft onClick={() => scrollPrev()} className="cursor-pointer" />
          <ArrowRight onClick={() => scrollNext()} className="cursor-pointer" />
        </div>
      </div>
      <section className="embla">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {data?.map((blog, idx) => {
              const image = blog.thumb as Media
              return (
                <div className="embla__slide" key={idx}>
                  <div className="min-h-[600px] flex flex-col px-[50px] pb-[60px] pt-[180px] relative bg-[#D9D9D9]">
                    <div className="absolute -top-[180px] left-0 w-11/12 h-[320px] md:w-[350px] sm:w-[280px]">
                      <Image src={image.url!} fill alt="" className="object-cover" />
                    </div>
                    <div className="flex flex-col gap-4">
                      <span className="text-[#1E1E1E] font-grotesk text-base">
                        {formatDate(blog.updatedAt)}
                      </span>
                      <span className="text-[#1E1E1E] font-grotesk text-[25px] font-bold max-w-[280px]">
                        {blog.chamada}
                      </span>
                      <p className="text-[#1E1E1E] font-grotesk text-lg max-w-[354px] sm:max-w-[280px]">
                        {blog.descricao}
                      </p>
                      <Link href={`/${lang}/blog/${blog.slug}`}>
                        <Button className="w-[147px] h-[35px] rounded-lg border border-black text-black font-grotesk text-lg transition-all hover:bg-black hover:text-white">
                          Leia mais
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
