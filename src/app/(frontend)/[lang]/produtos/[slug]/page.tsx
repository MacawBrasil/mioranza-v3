import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/Button'
import { Footer } from '@/components/Footer'
import { HeaderMobile } from '@/components/HeaderMobile'
import { Navbar } from '@/components/Navbar'
import RichText from '@/components/RichText'
import { Locale } from '@/lib/locale'
import { relationId } from '@/lib/utils'
import { Media, Product, Produto, Setting } from '@/payload/payload-types'
import { fetchProducts } from '../../../_api/fetchCollections'
import { fetchProduct } from '../../../_api/fetchDoc'
import { fetchSetting } from '../../../_api/fetchGlobals'

export async function generateStaticParams() {
  const products = await fetchProducts('pt')
  return products.filter((p) => p.slug).map((p) => ({ slug: p.slug as string }))
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string; lang: Locale }>
}): Promise<Metadata> {
  const params = await props.params
  const url = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3001'
  let doc: Produto | null = null
  try {
    doc = await fetchProduct({
      collection: 'products',
      slug: params.slug,
      locale: params.lang,
    })
  } catch (error: unknown) {
    // Erro silenciosamente ignorado
  }
  const image = doc?.Seo?.ImagemCompartilhada as Media | undefined
  const title = doc?.Seo?.titulo || 'Mioranza - Bem vindo'
  const description = doc?.Seo?.descricao || 'Mioranza - Bem vindo'
  const keywords = doc?.Seo?.palavrasChave || 'Mioranza - Bem vindo'

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

export default async function Page(props: { params: Promise<{ slug: string; lang: Locale }> }) {
  const params = await props.params
  let setting: Setting | null = null
  let doc: Product | null = null
  let relatedProducts: Product[] = []

  try {
    setting = await fetchSetting(params.lang)
    doc = await fetchProduct({
      collection: 'products',
      slug: params.slug,
      locale: params.lang,
    })

    const categoryIds = (doc?.categoria as (string | { id: string })[] | null | undefined)?.map(
      relationId,
    )
    if (categoryIds?.length) {
      const allProducts = await fetchProducts(params.lang)
      relatedProducts = allProducts.filter(
        prod =>
          prod.slug !== doc?.slug &&
          (prod.categoria as (string | { id: string })[] | null | undefined)?.some(cat => {
            return categoryIds.includes(relationId(cat))
          }),
      )
    }
  } catch (error) {
    return
  }

  const fundoHero = doc?.imagemFundoHero as Media

  return (
    <>
      <div
        //@ts-ignore
        after={`${doc?.titulo + doc?.tipo}`}
        className="w-screen h-[1080px] bg-[#EEEDE8] relative md:h-fit after:content-[attr(after)] after:absolute after:-bottom-[150px] after:left-1/2 after:-translate-x-1/2 after:text-[300px] after:font-rasbern after:text-nowrap  after:font-bold after:text-[#E5E4DF] 1366p:after:text-[200px] 1366p:after:-bottom-[110px] lg:after:text-[170px] lg:after:-bottom-[80px] sm:after:text-[50px] sm:after:-bottom-[10px]"
      >
        <Navbar isWhite loja={setting?.loja} lang={params.lang} />
        <HeaderMobile isWhite loja={setting?.loja} lang={params.lang} />
        <div className="flex gap-[144px] w-full h-full items-end justify-center md:flex-wrap md:h-auto md:pt-[300px] md:text-center sm:pt-[200px]">
          <div className="flex flex-col items-start max-w-[595px] -translate-y-80 lg:max-w-[300px] lg:z-10 md:translate-y-0 md:max-w-full md:items-center">
            <span className="text-[#CEC4C5] font-rasbern font-bold text-3xl leading-7 uppercase sm:text-1xl">
              {doc?.titulo}
            </span>
            <span className="text-[#CEC4C5] font-rasbern font-bold text-3xl leading-7 mb-[20px] uppercase sm:text-1xl">
              {doc?.tipo}
            </span>
            <RichText
              content={doc?.chamada}
              components={{
                p: ({ ...props }) => (
                  <p
                    className="text-[#181818] text-[60px] font-grotesk font-bold tracking-[12px] leading-[60px] sm:text-4xl"
                    {...props}
                  />
                ),
              }}
            />
            <p className="text-[#181818] text-lg font-grotesk font-normal mt-[30px] leading-5 mb-[50px] max-w-[384px] sm:text-base">
              {doc?.descricao}
            </p>
            <a href={doc?.link!} className="text-black font-grotesk font-normal">
              <Button className="w-[200px] h-[60px] rounded-lg bg-[#CEC4C5] transition-all hover:bg-transparent hover:border hover:border-black hover:text-black">
                Compre agora
              </Button>
            </a>
          </div>
          <div className="relative w-[365px] h-[829px] lg:h-[630px] md:h-[530px]">
            {/* <IconProductHero className="absolute -top-9 -left-36 lg:w-[534px] lg:-left-24 md:w-full md:-top-40 md:left-0" /> */}
            <div className="w-[634px] h-[539px] absolute -top-9 -left-36 lg:w-[534px] lg:-left-24 md:w-full md:-top-40 md:left-0">
              <Image src={fundoHero?.url} fill alt="" />
            </div>
            <Image
              //@ts-ignore
              src={doc?.imagemHero?.url}
              fill
              alt=""
              className="object-cover lg:object-contain z-10"
            />
          </div>
        </div>
      </div>
      {/* Sabores em sintonia */}
      <div className="w-screen py-[100px] pl-[362px] flex flex-col bg-[#EEEDE8] lg:pl-0 lg:items-center lg:px-8 sm:px-0 relative z-50">
        <span className="text-[#CEC4C5] text-xl font-grotesk font-bold">Sabores em sintonia</span>
        <span className="text-[#181818] text-[60px] font-grotesk font-normal leading-[60px] sm:text-4xl">
          <strong className="text-[#E97230]">HARMONIZAÇÃO</strong> <br />
          EM CADA PRATO
        </span>
        <div className="pt-[100px] w-full flex items-center justify-start lg:justify-center">
          {doc?.secaoHarmonizacao?.harmonizacoes?.map((_, idx) => {
            const image = _.imagem as Media
            return (
              <div key={idx} className="flex flex-col items-center gap-2">
                <Image src={image.url} width={55} height={55} alt="" />
                <span className="text-[#CEC4C5] text-lg font-grotesk font-bold">{_.titulo}</span>
              </div>
            )
          })}
        </div>
      </div>
      {/* banner */}
      <div className="relative w-screen h-[826px] sm:h-[300px]">
        <div className="absolute w-full max-w-[1620px] px-11 h-4 bg-[#E97230] -top-4 left-1/2 -translate-x-1/2 z-20 lg:w-full" />
        <div className="absolute w-full max-w-[1620px] px-11 h-4 bg-[#E97230] -bottom-4 left-1/2 -translate-x-1/2 z-20 lg:w-full" />
        <Image
          //@ts-ignore
          src={doc?.banner?.url}
          fill
          alt=""
          className="object-cover"
        />
      </div>
      {/* Sobre */}
      <div className="w-screen 1xl:flex 1xl:flex-col 1xl:gap-20">
        <div className="pl-[362px] flex flex-col mt-[116px] 1xl:pl-[220px] lg:pl-0 lg:items-center lg:text-center">
          <span className="font-bold font-grotesk text-xl text-[rgb(206,196,197)] leading-7 ">
            {doc?.sobre?.titulo}
          </span>
          <span className="text-6xl font-grotesk font-normal tex-[#181818]">
            <strong className="font-bold text-[#E97230]">CONHEÇA</strong> SOBRE <br />
            NOSSO VINHO
          </span>
        </div>
        <div className="w-full flex items-end gap-[120px] pl-[362px] 1xl:pl-[150px] 1xl:flex-wrap 1xl:justify-center lg:pl-0 lg:flex-col lg:items-center lg:text-center">
          <div className="max-w-[520px] flex flex-col gap-10 xl:max-w-[400px] lg:items-center sm:max-w-full sm:px-6">
            <p className="text-[#1E1E1E ] text-xl font-grotesk font-normal">
              {doc?.sobre?.descricao}
            </p>
            <ul className="mt-[55px] flex flex-col">
              {doc?.sobre?.caracteristicas?.map((_, idx) => (
                <div className="flex flex-col gap-4 py-4">
                  <div className="w-full h-1 bg-stone-300 rounded"></div>
                  <li key={idx} className="h-[76px]">
                    <span className="text-[#CEC4C5] text-xl font-grotesk font-bold">
                      {_.titulo}
                    </span>
                    <RichText
                      content={_.descricao}
                      components={{
                        p: ({ ...props }) => (
                          <p
                            className="text-[#1E1E1E] text-[22px] font-grotesk font-normal"
                            {...props}
                          />
                        ),
                      }}
                    />
                  </li>
                </div>
              ))}
            </ul>
            <a href={doc?.link!} className="text-black font-grotesk font-normal mt-[112px]">
              <Button className="w-[200px] h-[60px] rounded-lg bg-[#CEC4C5]  transition-all hover:bg-transparent hover:border hover:border-black hover:text-black">
                Compre agora
              </Button>
            </a>
          </div>
          <div className="relative w-[623px] h-[800px] 1xl:w-[500px] 1xl:h-[650px] md:w-[300px] md:h-[400px]">
            <Image
              //@ts-ignore
              src={doc?.sobre?.imagemCaracteristicas?.url}
              fill
              alt=""
            />
          </div>
        </div>
      </div>
      {/* vinhos relacionados */}
      <div className="w-screen flex flex-col items-center gap-[80px] mt-[157px] mb-[234px]">
        <div className="flex flex-col items-center">
          <span className="font-bold font-grotesk text-xl text-[#CEC4C5] leading-7 ">
            De vinho em vinho
          </span>
          <span className="text-6xl font-grotesk font-normal tex-[#181818] sm:text-5xl">
            APRIMORE O <br />
            <strong className="font-bold text-[#E97230]">SEU MUNDO</strong>
          </span>
        </div>
        <div className="flex items-center gap-[183px] flex-wrap justify-center">
          {relatedProducts?.map((prod: any, idx) => {
            const image = prod.thumb as Media
            return (
              <div
                className="flex items-center gap-8 relative md:flex-wrap md:justify-center md:text-center sm:flex-col"
                key={idx}
              >
                <div className="absolute -left-[100px] top-10 w-[144px] h-[268px] bg-[#EBE6E7] -z-10 sm:-left-[50px]" />
                <div className="relative w-[120px] h-[339px]">
                  <Image src={image.url} alt="" fill className="object-contain" />
                </div>
                <div className="flex flex-col">
                  <span className="text-black font-grotesk font-normal text-[22px]">
                    {prod.titulo}
                  </span>
                  <span className="text-black text-[45px] font-rasbern font-bold">{prod.tipo}</span>
                  <Link href={`/${params.lang}/produtos/${prod.slug}`}>
                    <Button className="w-[200px] h-[60px] bg-black text-white text-xl font-grotesk rounded-lg">
                      Conheça mais
                    </Button>
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <Footer border data={setting} lang={params.lang} />
    </>
  )
}
