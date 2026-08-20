import Image from 'next/image'
import Link from 'next/link'

import { Locale } from '@/lib/locale'
import { Media, Setting } from '@/payload/payload-types'
import { Button } from './Button'
import RichText from './RichText'
import { LogoFooter, LogoMacaw } from './SVGS'

interface iFooter {
  border: boolean
  data: Setting | null
  lang: Locale
}

export function Footer({ border, data, lang }: iFooter) {
  return (
    <div className="w-screen">
      {border && <div className="w-full h-[188px] bg-[#E97230]"></div>}
      <div className="w-full bg-[#181818] flex flex-col items-center justify-between gap-20 pt-[116px] pb-16 min-h-[810px] md:h-auto md:px-2 md:gap-14">
        <span className="text-white text-[20px] tracking-[12px] uppercase font-grotesk text-center md:text-base md:tracking-[6px] px-4">
          DESPERTE SEU LADO AUTÊNTICO. VIVA SUA ESSÊNCIA.
        </span>
        <div className="w-full max-w-[1620px] flex flex-wrap items-start justify-between gap-x-12 gap-y-16 px-8 xl:gap-x-8 md:flex-col md:items-center md:gap-12">
          <div className="flex flex-col items-center gap-[54px]">
            <LogoFooter className="md:w-[150px] 1xl:w-[120px]" />
            <span className="uppercase text-white font-grotesk text-sm">CNPJ {data?.cnpj}</span>
          </div>
          <div className="w-[276px] h-[110px] flex flex-col flex-wrap justify-between gap-x-8 md:w-auto md:h-auto md:flex-row md:justify-center md:gap-6">
            <Link href={`/${lang}/`} className="font-grotesk font-normal text-white text-lg">
              Home
            </Link>
            <Link
              href={`/${lang}/a-vinicola`}
              className="font-grotesk font-normal text-white text-lg"
            >
              A Vinícola
            </Link>
            <Link
              href={`/${lang}/produtos`}
              className="font-grotesk font-normal text-white text-lg"
            >
              Produtos
            </Link>
            <Link
              href={`/${lang}/enoturismo`}
              className="font-grotesk font-normal text-white text-lg"
            >
              Enoturismo
            </Link>
            <Link href={`/${lang}/contato`} className="font-grotesk font-normal text-white text-lg">
              Contato
            </Link>
            <Link href={`/${lang}/blog`} className="font-grotesk font-normal text-white text-lg">
              Blog
            </Link>
          </div>
          <div className="flex flex-col gap-9 md:items-center md:w-full">
            <a href={`${data?.loja}`} target="_blank" className="w-full flex justify-center">
              <Button className="rounded-lg bg-[#CEC4C5] w-[200px] sm:w-full h-[60px] text-[#1E1E1E] text-[20px] transition-all hover:bg-transparent hover:border hover:border-white hover:text-white">
                Nossa loja
              </Button>
            </a>
            <a href={`${data?.catalogo}`} target="_blank" className="w-full flex justify-center">
              <Button className="rounded-lg bg-[#E97230] w-[270px] sm:w-full h-[60px] text-white text-[20px]  transition-all hover:bg-transparent hover:border hover:border-[#E97230] hover:text-[#E97230]">
                Fichas técnicas
              </Button>
            </a>
            <a
              href={`${data?.fichasTecnicas}`}
              target="_blank"
              className="w-full flex justify-center"
            >
              <Button className="rounded-lg bg-white w-[270px] sm:w-full h-[60px] text-[#1E1E1E] text-[20px]  transition-all hover:bg-transparent hover:border hover:border-white hover:text-white">
                Baixar catálogo
              </Button>
            </a>
          </div>
          <div className="max-w-[235px] flex flex-col items-start md:items-center md:text-center">
            <RichText
              content={data?.endereco}
              components={{
                p: ({ ...props }) => (
                  <p
                    className="text-white text-lg font-grotesk md:text-base md:text-center"
                    {...props}
                  />
                ),
              }}
            />
            <a
              href={`mailto:${data?.email}`}
              target="_blank"
              className="text-white text-lg font-grotesk mt-8 sm:text-base"
            >
              {data?.email}
            </a>
            <a
              href={`tel:${data?.telefone?.replace(/\D/g, '')}`}
              target="_blank"
              className="text-white text-lg font-grotesk mt-4"
            >
              {data?.telefone}
            </a>
          </div>
          <div className="flex gap-3">
            {data?.redes?.map((_, idx) => {
              const icon = _.icone as Media
              return (
                <a href={`${_.link}`} target="_blank" key={idx}>
                  <Image src={icon.url!} width={30} height={30} alt="" />
                </a>
              )
            })}
          </div>
        </div>
        <div className="max-w-[1620px] w-full px-8 flex items-center justify-between flex-wrap md:justify-center md:gap-10 md:pb-10">
          <span className="text-white text-sm font-grotesk">
            Todos os direitos reservados. Mioranza 2023.
          </span>
          <div className="flex gap-[100px]">
            <a
              href={`${data?.politicaPrivacidade}`}
              target="_blank"
              className="text-white text-sm font-grotesk"
            >
              Politica de privacidade
            </a>
            <a
              href={`${data?.politicaCookies}`}
              target="_blank"
              className="text-white text-sm font-grotesk"
            >
              Politica de cookies
            </a>
          </div>
          <a href="https://macawbrasil.com.br" target="_blank">
            <LogoMacaw className="transition-all hover:scale-105" />
          </a>
        </div>
      </div>
    </div>
  )
}
