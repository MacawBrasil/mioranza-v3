import { Metadata } from 'next'
import Image from 'next/image'

import { Button } from '@/components/Button'
import { Footer } from '@/components/Footer'
import { HeaderMobile } from '@/components/HeaderMobile'
import { Navbar } from '@/components/Navbar'
import RichText from '@/components/RichText'
import { Locale } from '@/lib/locale'
import { Contato, Media, Setting } from '@/payload/payload-types'
import { fetchPagContato, fetchSetting } from '../../_api/fetchGlobals'
import { Form } from './Form'

export async function generateMetadata(props: {
  params: Promise<{ lang: Locale }>
}): Promise<Metadata> {
  const params = await props.params
  const url = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3001'
  const home = await fetchPagContato(params.lang)
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
  let page: Contato | null = null

  try {
    setting = await fetchSetting(params.lang)
    page = await fetchPagContato(params.lang)
  } catch (error) {}

  return (
    <>
      <div className="relative w-screen h-[209px] sm:h-[100px]">
        <Navbar isWhite loja={setting?.loja} lang={params.lang} />
        <HeaderMobile isWhite loja={setting?.loja} lang={params.lang} />
      </div>
      <div className="w-full h-[560px] relative flex items-center justify-center">
        <Image
          //@ts-ignore
          src={page?.banner?.url}
          fill
          alt=""
          className="object-cover -z-10"
        />
        <div className="flex flex-col w-full max-w-[762px] items-center text-center md:px-9">
          <span className="text-[#EEEDE8] text-xl font-grotesk font-bold">{page?.titulo}</span>
          <span className="text-[#EEEDE8] text-[60px] font-grotesk font-normal uppercase leading-[60px] tracking-[12px] sm:text-4xl">
            descubra o <br />
            <strong className="">
              sabor por trás <br />
              dos vinhedos
            </strong>
          </span>
          <p className="text-[#EEEDE8] text-xl font-grotesk font-normal max-w-[520px] mt-[30px]">
            {page?.description}
          </p>
        </div>
      </div>
      <div className="w-screen flex justify-center flex-wrap gap-[200px] xl:gap-[100px]">
        <div className="w-[560px] h-[1280px] bg-[#E97230] pt-[274px] flex flex-col items-center lg:order-2 sm:w-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3489.1310573329047!2d-51.25307632334021!3d-29.013109684223757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x951e9a6aaaaaaaad%3A0xe653b49e05ac7d9e!2sVin%C3%ADcola%20Mioranza!5e0!3m2!1spt-BR!2sbr!4v1709065819993!5m2!1spt-BR!2sbr"
            className="border-none w-[560px] h-[511px] sm:w-full"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          <div className="flex flex-col gap-5 pt-[61px] sm:items-center sm:text-center">
            <Button className="w-[200px] h-[60px] bg-transparent border border-white text-white rounded-lg">
              Abrir no mapa
            </Button>
            <RichText
              content={setting?.endereco}
              components={{
                p: ({ ...props }) => (
                  <p className="text-white text-lg font-grotesk max-w-[235px]" {...props} />
                ),
              }}
            />
            <a href={`mailto:${setting?.email}`} className="text-white text-lg font-grotesk">
              {setting?.email}
            </a>
            <a href={`tel:${setting?.telefone}`} className="text-white text-lg font-grotesk">
              {setting?.telefone}
            </a>
            <div className="flex gap-3">
              {setting?.redes?.map((_: any) => {
                const icon = _.icone as Media
                return (
                  <a key={_.id} href={`${_.link}`} target="_blank">
                    <Image src={icon.url} width={30} height={30} alt="" />
                  </a>
                )
              })}
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-start w-[540px] pt-[80px] gap-[60px] lg:items-center sm:w-full sm:px-10">
          <p className="text-[#1E1E1E] text-xl font-grotesk max-w-[333px] lg:max-w-full lg:text-center">
            {page?.texto}
          </p>
          <Form />
        </div>
      </div>
      <Footer border={false} data={setting} lang={params.lang} />
    </>
  )
}
