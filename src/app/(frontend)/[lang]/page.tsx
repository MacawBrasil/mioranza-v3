/* eslint-disable no-console */
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { Button } from '@/components/Button'
import { CarouselBlog } from '@/components/CarouselBlog'
import { Footer } from '@/components/Footer'
import { Hero } from '@/components/Hero'
import RichText from '@/components/RichText'
import { isValidLocale, Locale } from '@/lib/locale'
import { cn } from '@/lib/utils'
import { Home, Media, Post, Product, ProductCategory, Setting } from '@/payload/payload-types'
import { fetchBlogs, fetchProdCategories, fetchProductsHighlights } from '../_api/fetchCollections'
import { fetchHome, fetchSetting } from '../_api/fetchGlobals'

export async function generateMetadata(props: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const params = await props.params
  // Valida locale antes de fazer queries
  if (!isValidLocale(params.lang)) {
    return {}
  }

  const lang = params.lang as Locale
  const url = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3001'

  let home: Home | null = null
  try {
    home = await fetchHome(lang)
  } catch (error: unknown) {
    // Erro silenciosamente ignorado para evitar crash do app
  }

  const image = home?.Seo?.ImagemCompartilhada as Media | undefined
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
      images: image?.url ? [{ url: image.url }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image?.url ? [{ url: image.url }] : undefined,
    },
  }
}

export default async function Page(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params
  // Valida se o locale é válido, se não for, redireciona para a versão com locale válido
  if (!isValidLocale(params.lang)) {
    redirect(`/pt`)
  }

  const lang = params.lang as Locale
  let home: Home | null = null
  let setting: Setting | null = null
  let prodCategories: ProductCategory[] | null = null
  let productsHighlights: Product[] | null = null
  let posts: Post[] | null = null

  try {
    // Executa todas as chamadas em paralelo para melhor performance
    const [homeData, prodCategoriesData, settingData, productsHighlightsData, postsData] =
      await Promise.allSettled([
        fetchHome(lang),
        fetchProdCategories(lang),
        fetchSetting(lang),
        fetchProductsHighlights(lang),
        fetchBlogs(lang),
      ])

    // Processa resultados, ignorando erros silenciosamente
    if (homeData.status === 'fulfilled') {
      home = homeData.value
    }

    if (prodCategoriesData.status === 'fulfilled') {
      prodCategories = prodCategoriesData.value
    }

    if (settingData.status === 'fulfilled') {
      setting = settingData.value
    }

    if (productsHighlightsData.status === 'fulfilled') {
      productsHighlights = productsHighlightsData.value
    }

    if (postsData.status === 'fulfilled') {
      posts = postsData.value
    }
  } catch (error: unknown) {
    // Tratamento de erro genérico como fallback
    // Erro silenciosamente ignorado para evitar crash do app
  }

  return (
    <>
      <Hero data={home} loja={setting?.loja} lang={lang} whats={setting?.whatsapp} />
      {/* nossas marcas */}
      <div className="max-w-[1640px] w-full m-auto flex flex-col items-center gap-[88px] pt-[140px] mb-[183px] md:text-center">
        <span className="font-grotesk font-normal text-6xl uppercase">
          Nossas <strong>marcas</strong>
        </span>
        <div className="w-full grid grid-cols-5 place-items-center gap-7 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-1">
          {prodCategories?.map((_, idx) => {
            const image = _.imagem as Media
            return (
              <div
                className="h-[564px] flex flex-col items-center gap-11 relative group 1366p:w-[220px]"
                key={idx}
              >
                <div className="relative w-[131px] h-[413px]">
                  <Image
                    src={image.url || '/banner-home.png'}
                    fill
                    alt=""
                    className="z-10 object-contain"
                  />
                </div>
                <span
                  //@ts-ignore
                  style={{ '--color': _.cor }}
                  className={cn(
                    'group-hover:text-[--color]',
                    'text-black text-3xl font-normal leading-7 font-grotesk',
                  )}
                >
                  {_.titulo}
                </span>
                <div
                  //@ts-ignore
                  style={{ '--bg-color': _.cor }}
                  className={cn(
                    'bg-[--bg-color]',
                    'w-[244px] h-[244px] rounded-full absolute top-7 opacity-100 transition-all group-hover:top-[244px] group-hover:opacity-0 1366p:w-[200px] 1366p:h-[200px]',
                  )}
                ></div>
              </div>
            )
          })}
        </div>
      </div>
      {/* enoturismo */}
      <div className="w-screen h-[870px] flex justify-end relative md:h-auto md:justify-center md:flex-wrap">
        <div className="relative w-[844px] h-[870px] md:h-[300px] md:w-full md:-mb-16">
          <Image
            //@ts-ignore
            src={home?.enoturismo?.imagem?.url}
            fill
            alt=""
            className="object-cover"
          />
        </div>
        <div className="w-[940px] h-[870px] bg-[#CEC4C5] pl-[122px] pt-[130px] lg:w-full lg:pl-10 sm:px-4">
          <div className="flex flex-col items-end gap-[85px] max-w-[440px] md:items-center md:max-w-full">
            <div className="md:flex flex-col md:items-center md:text-center">
              <span className="text-[#1E1E1E] font-grotesk font-bold text-xl">
                {home?.enoturismo?.titulo}
              </span>
              <h2 className="font-grotesk text-[50px] font-light leading-[60px] max-w-[450px] uppercase md:w-full md:text-4xl">
                O ENOTURISMO EM UMA{' '}
                <strong className="font-bold text-[#E97230]">JORNADA INESQUECÍVEL</strong>
              </h2>
              <RichText
                components={{
                  p: ({ ...props }) => <p className="max-w-[356px] pt-[40px] w-full" {...props} />,
                }}
                content={home?.enoturismo?.descricao}
              />
            </div>
            <Link href={`/${lang}/enoturismo`}>
              <Button className="w-[200px] h-[60px] bg-black rounded-lg text-white font-grotesk font-normal text-xl transition-all hover:bg-transparent hover:border hover:border-black  hover:text-black">
                {home?.enoturismo?.textoBotao}
              </Button>
            </Link>
          </div>
          <video
            className="absolute w-[540px] h-[300px] -bottom-[179px] left-1/2 -translate-x-1/2 md:w-full 1xl:-bottom-[220px] object-cover"
            //@ts-ignore
            src={home?.enoturismo?.video?.url ?? undefined}
            poster={
              //@ts-ignore
              home?.enoturismo?.fundoVideo?.url || '/banner-fundo.png'
            }
            controls
            muted
            loop
          ></video>
        </div>
      </div>
      {/* produtos em destaque */}
      <div className="flex flex-col items-center pt-[293px]">
        <span className="tex-[#CEC4C5] text-xl font-grotesk font-bold">Nossos produtos</span>
        <span className="tex-[#CEC4C5] text-[60px] font-grotesk font-bold uppercase">
          destaques
        </span>
        <div className="w-full flex gap-[63px] justify-center pt-[70px] flex-wrap">
          {productsHighlights?.map((prod, idx) => {
            const thumb = prod.thumb as Media
            const bg = prod.imagemFundo as Media
            return (
              <div
                className="w-[435px] h-[920px] flex flex-col items-center justify-end relative group 1366p:w-[340px]"
                key={idx}
              >
                <div className="w-full h-[585px] bg-[#EBE6E7] absolute top-0 -z-10 overflow-hidden transition-all group-hover:h-[659px] group-hover:bg-black">
                  <Image
                    src={bg.url}
                    fill
                    alt=""
                    className="object-cover opacity-0 scale-100 transition-all group-hover:opacity-30 group-hover:scale-110"
                  />
                </div>
                <Image src={thumb.url} width={143} quality={100} height={590} alt="" />
                <span className="text-[#CEC4C5] text-[22px] font-grotesk leading-6 mt-5">
                  {prod.titulo}
                </span>
                <span className="font-rasbern text-[45px] text-[#CEC4C5] font-bold">
                  {prod.tipo}
                </span>
                <Link href={`/${lang}/produtos/${prod.slug}`}>
                  <Button className="w-[200px] h-[60px] mt-[33px] bg-black rounded-lg text-white font-grotesk font-normal text-xl transition-all hover:bg-transparent hover:border hover:border-black hover:text-black">
                    Conheça mais
                  </Button>
                </Link>
              </div>
            )
          })}
        </div>
      </div>
      <div className="relative w-[1554px] h-[422px] lg:w-full mt-[225px] mb-[83px] 1xl:w-full">
        <Image
          //@ts-ignore
          src={home?.imagem?.url}
          fill
          alt=""
          className="object-cover"
        />
      </div>
      <div className="max-w-[1458px] w-full flex flex-col gap-[116px] m-auto xl:pl-5 sm:px-6 1366p:items-center">
        <div className="flex flex-col 1xl:px-8 1366p:items-center 1366p:text-center">
          <span className="text-[#CEC4C5] text-xl font-grotesk font-bold">
            {home?.secaoDiferenciais?.titulo}
          </span>
          <span className="font-grotesk text-[60px] leading-[60px] uppercase sm:text-4xl">
            Um <strong className="font-bold text-[#E97230]">toque</strong> <br />
            distinto
          </span>
        </div>
        <div className="flex justify-center gap-[60px] flex-wrap">
          {home?.secaoDiferenciais?.diferenciais?.map((dif, idx) => {
            const image = dif.imagem as Media
            return (
              <div
                className="max-w-[160px] flex items-center justify-center flex-col text-center gap-6"
                key={idx}
              >
                <Image src={image.url} width={110} height={110} alt="" />
                <RichText
                  content={dif.titulo}
                  components={{
                    p: ({ ...props }) => (
                      <p className="text-[#1E1E1E] font-grotesk text-lg" {...props} />
                    ),
                  }}
                />
              </div>
            )
          })}
        </div>
      </div>
      <div className="mt-[272px] w-full max-w-[1920px] md:flex md:flex-col md:gap-5 md:mt-40">
        <div className="flex justify-between w-full lg:gap-5 lg:justify-center md:flex-wrap">
          <div className="relative w-[390px] h-[390px] md:w-full 1366p:w-[300px]">
            <Image
              //@ts-ignore
              src={home?.secaoQuemSomos?.imagem1?.url}
              fill
              alt=""
              className="object-cover"
            />
          </div>
          <div className="flex flex-col max-w-[570px] pl-10 pt-4 md:pl-5 md:text-center sm:px-6">
            <span className="text-[#CEC4C5] text-xl font-grotesk font-bold">
              {home?.secaoQuemSomos?.titulo}
            </span>
            <span className="font-grotesk text-[60px] leading-[60px] uppercase sm:text-4xl">
              <strong className="font-bold text-[#E97230]">Paixão</strong> <br /> e tradição
            </span>
            <RichText
              content={home?.secaoQuemSomos?.descicao}
              components={{
                p: ({ ...props }) => (
                  <p
                    className="mt-[60px] text-[#1E1E1E] font-grotesk text-lg max-w-[384px] w-full md:mt-10"
                    {...props}
                  />
                ),
              }}
            />
          </div>
          <video
            className="md:mt-5 relative w-[960px] object-cover h-[390px] after:z-10 after:absolute after:-top-[18px] after:left-0 after:w-full after:h-[18px] after:bg-[#E97230] 1xl:w-[700px] xl:w-[400px] lg:w-full 1366p:w-[600px]"
            //@ts-ignore
            src={home?.secaoQuemSomos?.video?.url ?? undefined}
            poster={
              //@ts-ignore
              home?.enoturismo?.fundoVideo?.url || '/banner-fundo.png'
            }
            controls
            muted
            loop
          ></video>
        </div>
        <div className="w-full flex lg:justify-center md:flex-wrap">
          <div className="w-[570px] h-[390px] bg-[#D9D9D9] flex items-center justify-center md:w-full 1xl:w-[300px] lg:w-[250px]">
            <Image
              //@ts-ignore
              src={home?.secaoQuemSomos?.imagem2?.url}
              width={230}
              height={230}
              alt=""
              className="ml-28 md:ml-0 1xl:ml-0"
            />
          </div>
          <div className="w-[390px] h-[576px] relative md:w-full xl:w-[300px] xl:h-[470px] lg:w-[250px] lg:h-[390px]">
            <Image
              //@ts-ignore
              src={home?.secaoQuemSomos?.imagem3?.url}
              fill
              alt=""
              className="object-cover"
            />
          </div>
          <div className="h-[390px] w-[390px] flex items-center justify-center lg:order-6 1xl:w-[300px] lg:w-[250px]">
            <Link href={`/${lang}/a-vinicola`}>
              <Button className="w-[200px] h-[60px] bg-black rounded-lg text-white font-grotesk font-normal text-xl transition-all hover:bg-transparent hover:border hover:border-black hover:text-black">
                {home?.secaoQuemSomos?.textoBotao}
              </Button>
            </Link>
          </div>
          <div className="w-[390px] h-[390px] relative md:w-full xl:w-[360px] lg:w-[250px]">
            <Image
              //@ts-ignore
              src={home?.secaoQuemSomos?.imagem4?.url}
              fill
              alt=""
              className="object-cover"
            />
          </div>
          <div className="w-[145px] h-[390px] bg-[#D9D9D9] xl:hidden 1xl:w-[138px]"></div>
        </div>
      </div>
      <CarouselBlog home={home} data={posts} lang={lang} />
      <Footer border data={setting} lang={lang} />
    </>
  )
}
