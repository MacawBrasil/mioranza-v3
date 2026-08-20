import { Metadata } from 'next'
import Image from 'next/image'

import { Footer } from '@/components/Footer'
import { HeaderMobile } from '@/components/HeaderMobile'
import { Navbar } from '@/components/Navbar'
import { LogoWhats } from '@/components/SVGS'
import { Locale } from '@/lib/locale'
import { Enoturismo, Media, Setting } from '@/payload/payload-types'
import { fetchEnoturismo, fetchSetting } from '../../_api/fetchGlobals'
import { SlidesShow } from './SlidesShow'

import './styles.css'

export async function generateMetadata(props: {
  params: Promise<{ lang: Locale }>
}): Promise<Metadata> {
  const params = await props.params
  const url = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3001'
  const home = await fetchEnoturismo(params.lang)
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
      images: image?.url && [{ url: image?.url }],
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
  let page: Enoturismo | null = null
  let setting: Setting | null = null
  try {
    page = await fetchEnoturismo(params.lang)
    setting = await fetchSetting(params.lang)
  } catch (error) {}

  const image = page?.secao?.imagem as Media
  return (
    <>
      {/* imagens */}
      <a
        href={`https://wa.me/${setting?.whatsapp?.replace(
          /\D/g,
          '',
        )}?text=Vim%20pela%20pagina%20enoturismo%20do%20site%20Mioranza.com.br`}
        target="_blank"
      >
        <LogoWhats className="fixed right-[160px] top-1/2 z-20 sm:right-10 sm:top-3/4" />
      </a>
      <div className="relative w-screen h-[780px] flex items-end sm:h-[100px]">
        <Navbar isWhite loja={setting?.loja} lang={params.lang} />
        <HeaderMobile isWhite loja={setting?.loja} lang={params.lang} />
        {/* <SlidesShow banners={page?.banners} /> */}
        <div className="w-full h-[500px] flex items-end sm:hidden sm:h-0">
          <div className="relative w-[465px] h-[531px]">
            <Image
              //@ts-ignore
              src={page?.imagem1?.url}
              fill
              alt=""
              className="object-cover"
            />
          </div>
          <div className="relative w-[994px] h-[589px]">
            <Image
              //@ts-ignore
              src={page?.imagem2?.url}
              fill
              alt=""
              className="object-cover"
            />
          </div>
          <div className="relative w-[465px] h-[531px]">
            <Image
              //@ts-ignore
              src={page?.imagem3?.url}
              fill
              alt=""
              className="object-cover"
            />
          </div>
        </div>
      </div>
      {/* enoturismo */}
      <div className="w-screen min-h-[986px] relative mt-[92px] 1xl:min-h-[800px] md:flex md:flex-col md:items-center md:justify-center md:px-8 md:text-center md:gap-20 sm:min-h-[300px]">
        <div className="flex flex-col absolute left-[404px] top-0 1xl:left-[150px] md:static">
          <span className="text-[#CEC4C5] text-xl font-grotesk font-bold">
            {page?.secao?.titulo}
          </span>
          <span className="text-[#181818] text-[60px] font-grotesk font-normal uppercase leading-[60px] tracking-[12px] sm:text-4xl">
            uma <strong className="text-[#E97230]">jornada</strong> <br />
            <strong className="text-[#E97230]">sensorial</strong> pelos <br /> nossos vinhedos
          </span>
        </div>
        <div className="absolute w-[463px] h-[600px] top-[187px] right-0 1xl:w-[363px] 1xl:h-[500px] md:hidden">
          //@ts-ignore
          <Image src={image?.url} fill alt="" />
        </div>
        <video
          className="absolute object-cover w-[1266px] h-[600px] bottom-0 left-0 1xl:w-[900px] 1xl:h-[450px] xl:w-[800px] xl:h-[400px] md:relative md:w-full sm:h-[200px]"
          //@ts-ignore
          src={page?.secao?.video?.url ?? undefined}
          //@ts-ignore
          poster={page?.secao?.fundoVideo?.url || '/banner-home.png'}
          controls
          playsInline
          muted
          loop
        ></video>
      </div>
      {/* roteiros */}
      <div className="w-screen flex flex-col items-center mb-[218px] mt-20">
        <span className="text-[#EBE6E7] text-[380px] font-rasbern font-bold uppercase 1xl:text-[300px] md:text-[100px] sm:text-[60px] sm:text-black">
          roteiros
        </span>
        <SlidesShow roteiros={page?.roteiros} />
      </div>
      <Footer border data={setting} lang={params.lang} />
    </>
  )
}
