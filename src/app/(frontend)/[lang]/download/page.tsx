import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/Button'
import { Footer } from '@/components/Footer'
import { HeaderMobile } from '@/components/HeaderMobile'
import { Navbar } from '@/components/Navbar'
import RichText from '@/components/RichText'
import { Locale } from '@/lib/locale'
import { Download, Media, Setting } from '@/payload/payload-types'
import { fetchPagDownload, fetchSetting } from '../../_api/fetchGlobals'

export async function generateMetadata(props: {
  params: Promise<{ lang: Locale }>
}): Promise<Metadata> {
  const params = await props.params
  const url = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3001'
  const home = await fetchPagDownload(params.lang)
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
  let setting: Setting | null = null
  let page: Download | null = null

  try {
    setting = await fetchSetting(params.lang)
    page = await fetchPagDownload(params.lang)
  } catch (error) {}

  const image = page?.imagem2 as Media
  return (
    <>
      <div className="w-screen h-[800px] relative flex items-end lg:h-[125vh] sm:h-fit sm:pt-[200px]">
        <Navbar isWhite loja={setting?.loja} lang={params.lang} />
        <HeaderMobile isWhite loja={setting?.loja} lang={params.lang} />
        <div className="w-[1780px] h-[585px] flex gap-[156px] items-center justify-end 1xl:w-[1200px] 1xl:mx-auto lg:flex-col lg:h-fit sm:w-full sm:px-6">
          <div className="flex flex-col max-w-[623px] lg:items-center lg:text-center sm:w-full">
            <span className="text-[#1E1E1E] text-xl font-grotesk font-bold">{page?.titulo}</span>
            <span className="text-[#1E1E1E] text-[60px] font-grotesk uppercase leading-[60px] tracking-[12px] sm:text-4xl">
              Baixe Nossos <br /> <strong className="text-[#E97230]">conteúdos</strong> <br />
              <strong className="text-[#E97230]">Exclusivos</strong>
            </span>
            <RichText
              content={page?.descricao}
              components={{
                p: ({ ...props }) => (
                  <p
                    className="mt-[30px] text-[#1E1E1E] text-xl font-grotesk max-w-[520px]"
                    {...props}
                  />
                ),
              }}
            />
          </div>
          <div className="relative w-[735px] h-[585px] 1xl:w-[635px] 1xl:h-[485px] sm:w-[359px] sm:h-[307px]">
            <Image
              //@ts-ignore
              src={page?.imagem?.url}
              fill
              alt=""
              className="object-cover z-10"
            />
          </div>
        </div>
      </div>

      <div className="max-w-[1780px] h-[1050px] bg-[#E97230] relative -mt-12 1xl:w-full 1xl:mt-10 lg:h-fit lg:flex lg:flex-col lg:items-center lg:gap-24 lg:static lg:py-20 lg:justify-center">
        <div className="absolute left-[266px] top-[122px] flex flex-col lg:static">
          <span className="text-[#1E1E1E] text-4xl font-grotesk font-bold leading-[30px]">
            Desvende <br /> segredos
          </span>
          <span className="text-white text-4xl font-grotesk font-normal leading-[30px]">
            com nossos <br /> materiais de <br /> download
          </span>
        </div>
        <div className="absolute w-[630px] h-[607px] left-0 bottom-0 1xl:w-[500px] 1xl:h-[507px] lg:relative sm:w-[359px] sm:h-[307px]">
          <Image src={image?.url} fill alt="" className="object-cover" />
        </div>
        <div className="w-[866px] absolute top-1/2 -translate-y-1/2 right-0 flex flex-col gap-10 1xl:w-[700px] lg:static lg:-translate-y-0 lg:items-center lg:w-full sm:px-8">
          <div className="flex flex-col gap-4 lg:items-center">
            <div className="flex items-center flex-wrap gap-9 sm:justify-center sm:text-center">
              <Image
                //@ts-ignore
                src={page?.catalogoProdutos?.icone?.url}
                width={70}
                height={70}
                alt=""
              />
              <span className="text-[#181818] text-[40px] font-grotesk tracking-[8px] leading-[40px] uppercase">
                catálogo <br />
                de produtos
              </span>
            </div>
            <div className="translate-x-[110px] flex flex-col gap-4 1xl:max-w-[450px] lg:translate-x-0 lg:items-center lg:text-center">
              <p className="max-w-[520px] text-[#EEEDE8] text-xl font-grotesk leading-[25px] 1xl:max-w-[450px]">
                {page?.catalogoProdutos?.descricao}
              </p>
              <Link href={`/${page?.catalogoProdutos?.arquivo}`}>
                <Button className="w-[200px] h-[60px] text-white font-grotesk font-normal rounded-lg bg-black transition-all hover:bg-transparent hover:text-black hover:border hover:border-black">
                  Baixe agora
                </Button>
              </Link>
            </div>
          </div>
          <div className="w-[760px] h-[10px] bg-[#EEEDE8] translate-x-[106px] 1xl:w-[580px] lg:w-full lg:translate-x-0" />
          <div className="flex flex-col gap-4">
            <div className="flex items-center flex-wrap gap-9 sm:justify-center sm:text-center">
              <Image
                //@ts-ignore
                src={page?.midiaKit?.icone?.url}
                width={70}
                height={70}
                alt=""
              />
              <span className="text-[#181818] text-[40px] font-grotesk tracking-[8px] leading-[40px] uppercase">
                mídia kit
              </span>
            </div>
            <div className="translate-x-[110px] flex flex-col gap-4 1xl:max-w-[450px] lg:translate-x-0 lg:items-center lg:text-center">
              <p className="max-w-[520px] text-[#EEEDE8] text-xl font-grotesk leading-[25px] 1xl:max-w-[450px]">
                {page?.midiaKit?.descricao}
              </p>
              <Link href={`/${page?.midiaKit?.arquivo}`}>
                <Button className="w-[200px] h-[60px] text-white font-grotesk font-normal rounded-lg bg-black transition-all hover:bg-transparent hover:text-black hover:border hover:border-black">
                  Baixe agora
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer data={setting} border={false} lang={params.lang} />
    </>
  )
}
