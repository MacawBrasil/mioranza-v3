import { Suspense } from 'react'
import { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'

import { Footer } from '@/components/Footer'
import { HeaderMobile } from '@/components/HeaderMobile'
import { Navbar } from '@/components/Navbar'
import RichText from '@/components/RichText'
import { Locale } from '@/lib/locale'
import { Media, Product, ProductCategory, Produto, Setting } from '@/payload/payload-types'
import { fetchProdCategories, fetchProducts } from '../../_api/fetchCollections'
import { fetchPagProdutos, fetchSetting } from '../../_api/fetchGlobals'
import { FilterCategoryContent } from './FilterCategoryContent'

export async function generateMetadata(props: {
  params: Promise<{ lang: Locale }>
}): Promise<Metadata> {
  const params = await props.params
  const url = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3001'
  const home = await fetchPagProdutos(params.lang)
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
  let page: Produto | null = null
  let categories: ProductCategory[] | null = null
  let products: Product[] | null = null
  let setting: Setting | null = null
  try {
    page = await fetchPagProdutos(params.lang)
    categories = await fetchProdCategories(params.lang)
    products = await fetchProducts(params.lang)
    setting = await fetchSetting(params.lang)
  } catch (error) {
    return notFound()
  }

  return (
    <>
      <div className="w-full h-[531px] relative flex items-end justify-center sm:min-h-[300px]">
        <Navbar isWhite loja={setting?.loja} lang={params.lang} />
        <HeaderMobile isWhite loja={setting?.loja} lang={params.lang} />
        <div className="absolute left-0 bottom-0 w-[520px] h-[340px] 1xl:w-[400px] xl:w-[350px] lg:hidden">
          <Image
            //@ts-ignore
            src={page?.imagem?.url}
            fill
            alt=""
            className="object-cover"
          />
        </div>
        <div className="max-w-[835px] flex flex-col justify-center items-center sm:px-6 sm:max-w-full">
          <span className="text-[#CEC4C5] text-[30px] font-rasbern font-bold leading-[28px]">
            {page?.titulo}
          </span>
          <span className="text-[#181818] font-grotesk font-normal text-[60px] uppercase text-center  leading-[60px] mt-[20px] sm:translate-x-0 sm:text-4xl">
            O{' '}
            <strong className="text-[#E97230] font-bold">
              Melhor do <br />
              Nosso Terroir
            </strong>
            <br /> em Cada Gole
          </span>
          <RichText
            content={page?.descricao}
            components={{
              p: ({ ...props }) => (
                <p
                  className="text-[#1E1E1E] font-grotesk text-lg text-center max-w-[418px] mt-[27px]"
                  {...props}
                />
              ),
            }}
          />
        </div>
      </div>
      <Suspense fallback={null}>
        <FilterCategoryContent categories={categories} products={products} locale={params.lang} />
      </Suspense>
      <div className="relative w-full max-w-[1638px] h-[666px] flex items-center justify-center text-center m-auto mt-[283px]">
        <Image
          //@ts-ignore
          src={page?.banner?.imagem?.url}
          fill
          alt=""
          className="-z-10"
        />
        <p className="text-[#EEEDE8] text-[45px] font-rasbern font-normal max-w-[1091px] sm:text-4xl">
          Dos vinhos jovens aos clássicos envelhecidos, <br />
          cada rótulo é uma viagem pelos campos que <br />
          dão <strong className="text-[#E97230] text-[65px] font-rasbern font-bold">vida</strong> às
          nossas videiras.
        </p>
      </div>
      <Footer border data={setting} lang={params.lang} />
    </>
  )
}
