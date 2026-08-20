import { Metadata } from 'next'

import { Footer } from '@/components/Footer'
import { HeaderMobile } from '@/components/HeaderMobile'
import { Navbar } from '@/components/Navbar'
import RichText from '@/components/RichText'
import { SlidesMomentos } from '@/components/SlidesMomentos'
import { SlidesOnline } from '@/components/SlidesOnline'
import { SlidesOrigem } from '@/components/SlidesOrigem'
import { Locale } from '@/lib/locale'
import { Legado, Media, Setting } from '@/payload/payload-types'
import { fetchLegado, fetchSetting } from '../../_api/fetchGlobals'

export async function generateMetadata(props: {
  params: Promise<{ lang: Locale }>
}): Promise<Metadata> {
  const params = await props.params
  const url = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3001'
  const home = await fetchLegado(params.lang)
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

export default async function Page(props: { params: Promise<{ slug: string; lang: Locale }> }) {
  const params = await props.params
  let setting: Setting | null = null
  let page: Legado | null = null
  try {
    setting = await fetchSetting(params.lang)
    page = await fetchLegado(params.lang)
  } catch (error) {}
  return (
    <>
      <div className="w-screen h-[231px] relative sm:h-[200px]">
        <Navbar loja={setting?.loja} lang={params.lang} isWhite />
        <HeaderMobile loja={setting?.loja} lang={params.lang} isWhite />
      </div>
      <div className="flex flex-col items-center w-full px-8 sm:text-center">
        <span className="font-grotesk text-xl text-[#CEC4C5]">{page?.titulo}</span>
        <span className="font-grotesk font-normal text-6xl uppercase leading-[60px] tracking-[12px]">
          Da terra, das <br /> mãos e <strong className="text-[#E97230]">da uva</strong>
        </span>
        <SlidesOrigem data={page?.slidesOrigem} selo={setting?.selo} />
      </div>
      <SlidesMomentos data={page?.secaoMomentos} />
      <SlidesOnline data={{ secaoOnline: page?.secaoOnline }} />
      <Footer border data={setting} lang={params.lang} />
    </>
  )
}
