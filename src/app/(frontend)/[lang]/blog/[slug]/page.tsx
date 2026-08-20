import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/Button'
import { Footer } from '@/components/Footer'
import { HeaderMobile } from '@/components/HeaderMobile'
import { Navbar } from '@/components/Navbar'
import RichText from '@/components/RichText'
import { formatDate } from '@/lib/FormatDate'
import { Locale } from '@/lib/locale'
import { Media, Post, Setting } from '@/payload/payload-types'
import { fetchBlogs, fetchPostsWithCategoryID } from '../../../_api/fetchCollections'
import { fetchBlog } from '../../../_api/fetchDoc'
import { fetchSetting } from '../../../_api/fetchGlobals'

export async function generateStaticParams() {
  const posts = await fetchBlogs('pt')
  return posts.filter((p) => p.slug).map((p) => ({ slug: p.slug as string }))
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string; lang: Locale }>
}): Promise<Metadata> {
  const params = await props.params
  const url = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3001'
  let doc: Post | null = null
  try {
    doc = await fetchBlog({
      collection: 'posts',
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
  let doc: Post | null = null
  let setting: Setting | null = null
  let relationalPosts: Post[] | null = null

  try {
    doc = await fetchBlog({
      slug: params.slug,
      collection: 'posts',
      locale: params.lang,
    })
    setting = await fetchSetting(params.lang)

    relationalPosts = await fetchPostsWithCategoryID({
      //@ts-ignore
      id: doc?.categoria?.id,
      locale: params.lang,
    })
  } catch (error) {}

  return (
    <>
      <div className="w-screen h-[603px] relative sm:h-[200px]">
        <div className="bg-banner_gradient h-[245px]">
          <Navbar loja={setting?.loja} lang={params.lang} />
          <HeaderMobile loja={setting?.loja} lang={params.lang} />
        </div>
        <Image
          //@ts-ignore
          src={doc?.banner?.url!}
          fill
          alt=""
          className="object-cover -z-10"
        />
      </div>
      <div className="w-full max-w-[1015px] m-auto mt-[65px] lg:px-10">
        <div className="flex items-end gap-8 flex-wrap lg:justify-center mb-20">
          <div className="flex flex-col max-w-full">
            <span className="text-[#CEC4C5] text-xl font-grotesk font-bold sm:text-base">
              {formatDate(doc?.updatedAt!)}
            </span>
            <h1 className="text-[#181818] text-4xl font-grotesk font-normal leading-normal sm:text-2xl">
              {doc?.chamada}
            </h1>
          </div>
          <p className="w-full text-[#1E1E1E] text-xl font-grotesk sm:text-sm">{doc?.descricao}</p>
        </div>
        <RichText
          content={doc?.texto}
          components={{
            p: ({ ...props }) => (
              <p className="text-[#1E1E1E] font-grotesk text-xl mt-8 sm:text-sm" {...props} />
            ),
          }}
        />
      </div>
      <div className="w-full max-w-[1645px] flex items-center justify-between mt-[170px] mb-[90px] 1xl:pr-9 1xl:justify-around">
        <div className="w-[1191px] h-[2px] bg-[#CEC4C5] 1xl:w-[1000px] md:w-[400px] sm:w-[100px]" />
        <Link href={`/${params.lang}/blog`}>
          <Button className="w-[200px] h-[60px] text-black font-grotesk font-normal rounded-lg bg-[#CEC4C5] transition-all hover:bg-transparent hover:border hover:border-black">
            Voltar
          </Button>
        </Link>
      </div>
      <div className="flex flex-col w-full max-w-[1600px] px-9 m-auto mb-[146px] gap-[80px] sm:gap-10">
        <span className="text-[#1E1E1E] font-grotesk font-bold text-[35px] sm:text-2xl">
          Conteúdos relacionados
        </span>
        <div className="w-full grid grid-cols-3 gap-14 xl:grid-cols-2 sm:gap-8 md:grid-cols-1">
          {relationalPosts?.map(blog => {
            const image = blog.thumb as Media
            return (
              <div key={blog.id} className="h-fit w-full flex flex-col justify-end  pb-[60px] relative bg-[#D9D9D9] sm:px-4">
                <div className="absolute -top-[180px] left-0 w-[400px] h-[320px] 1366p:w-full 1xl:h-[220px] 1xl:-top-[100px] 1366p:relative 1366p:top-0">
                  <Image src={image.url!} fill alt="" className="object-cover" />
                </div>
                <div className="flex flex-col gap-4 mt-44 px-[50px] 1366p:mt-10 sm:px-4">
                  <span className="text-[#1E1E1E] font-grotesk text-base">
                    {formatDate(blog.updatedAt)}
                  </span>
                  <span className="text-[#1E1E1E] font-grotesk text-[25px] font-bold max-w-[280px] sm:text-lg xl:max-w-full">
                    {blog.chamada}
                  </span>
                  <p className="text-[#1E1E1E] font-grotesk text-lg max-w-[354px] xl:max-w-full">
                    {blog.descricao}
                  </p>
                  <Link href={`/${params.lang}/blog/${blog.slug}`}>
                    <Button className="w-[147px] h-[35px] rounded-lg border border-black text-black font-grotesk text-lg transition-all hover:bg-black hover:text-white">
                      Leia mais
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
