import { Metadata } from 'next'
import Image from 'next/image'

import { Footer } from '@/components/Footer'
import { HeaderMobile } from '@/components/HeaderMobile'
import { Navbar } from '@/components/Navbar'
import { Locale } from '@/lib/locale'
import { Blog, Media, Post, Setting } from '@/payload/payload-types'
import { fetchBlogs } from '../../_api/fetchCollections'
import { fetchPagBlog, fetchSetting } from '../../_api/fetchGlobals'
import { ContentBlogs } from './contentBlogs'

export async function generateMetadata(props: {
  params: Promise<{ lang: Locale }>
}): Promise<Metadata> {
  const params = await props.params
  const url = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3001'
  const home = await fetchPagBlog(params.lang)
  const image = home?.Seo?.ImagemCompartilhada as Media
  const title = home?.Seo?.titulo || 'Mioranza - Bem vindo'
  const description = home?.Seo?.descricao || 'Mioranza - Bem vindo'
  const keywords = home?.Seo?.palavrasChave || 'Mioranza - Bem vindo'

  return {
    metadataBase: new URL(url),
    keywords,
    title,
    description,
    openGraph: {
      type: 'website',
      url,
      title,
      description,
      images: image?.url! && [{ url: image?.url! }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image?.url && [{ url: image?.url }],
    },
  }
}

export default async function Page(props: { params: Promise<{ lang: Locale }> }) {
  const params = await props.params
  let setting: Setting | null = null
  let page: Blog | null = null
  let posts: Post[] | null = null

  try {
    setting = await fetchSetting(params.lang)
    page = await fetchPagBlog(params.lang)
    posts = await fetchBlogs(params.lang)
  } catch (error) {}
  return (
    <>
      <div className="relative w-screen h-[209px]">
        <Navbar isWhite loja={setting?.loja} lang={params.lang} />
        <HeaderMobile isWhite loja={setting?.loja} lang={params.lang} />
      </div>
      <div className="flex items-center gap-[173px] xl:gap-[80px] md:w-full">
        <div className="relative w-[1039px] h-[631px] 1xl:w-[739px] 1xl:h-[431px] md:hidden">
          <Image
            //@ts-ignore
            src={page?.imagem?.url!}
            fill
            alt=""
            className="object-cover"
          />
        </div>
        <div className="flex flex-col md:w-full md:justify-center md:items-center md:text-center sm:px-6">
          <span className="text-[#CEC4C5] text-xl font-bold font-grotesk">{page?.titulo}</span>
          <span className="text-[#181818] font-grotesk text-[60px] leading-[60px] uppercase sm:text-4xl">
            HISTÓRIAS E <br />
            <strong className="text-[#E97230]">SABORES</strong>
          </span>
          <p className="mt-[60px] text-[#1E1E1E] text-lg font-grotesk max-w-[384px]">
            {page?.description}
          </p>
        </div>
      </div>
      <ContentBlogs data={posts} locale={params.lang} />
      <Footer border data={setting} lang={params.lang} />
    </>
  )
}
