'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from '@/components/Button'
import { Locale } from '@/lib/locale'
import { cn } from '@/lib/utils'
import {
  IconClose,
  Logo,
  LogoBrasil,
  LogoEua,
  LogoSpain,
  MenuIcon,
  MenuIconBlack,
  WhiteLogo,
} from './SVGS'

interface iMobile {
  isWhite?: boolean
  loja?: string | null | undefined
  lang: Locale
}

export function HeaderMobile({ isWhite, loja, lang }: iMobile) {
  const path = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [scroll, setScroll] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  return (
    <div
      className={cn(
        'hidden xl:flex xl:pt-[60px] xl:fixed xl:top-0 xl:left-0 xl:z-50 xl:items-center xl:justify-between xl:w-screen xl:px-16 sm:pt-6 sm:pb-6 transition-all',
        scroll > 0 && 'sm:fixed sm:bg-black/40 backdrop-blur sm:shadow sm:transition-all',
      )}
    >
      {isWhite ? (
        <Link
          href={(() => {
            const splitted = path.split('/')
            return `/${splitted[1]}`
          })()}
        >
          <WhiteLogo className="sm:w-[100px] sm:h-[30px]" />
        </Link>
      ) : (
        <Link
          href={(() => {
            const splitted = path.split('/')
            return `/${splitted[1]}`
          })()}
        >
          <Logo className="sm:w-[100px] sm:h-[30px]" />
        </Link>
      )}
      {isWhite ? (
        <MenuIconBlack onClick={() => setIsOpen(old => !old)} />
      ) : (
        <MenuIcon onClick={() => setIsOpen(old => !old)} />
      )}
      <div
        className={cn(
          'fixed opacity-0 w-screen h-screen top-0 -right-full bg-[#CEC4C5]  z-50 shadow px-6 flex flex-col items-center gap-10',
          isOpen && 'right-0 opacity-100',
        )}
      >
        <div className="w-full flex items-center justify-between py-6 max-w-[700px]">
          <WhiteLogo className="w-[100px] h-[30px]" />
          <IconClose onClick={() => setIsOpen(old => !old)} className="cursor-pointer" />
        </div>
        <nav className="flex items-center flex-col gap-[10px] w-full">
          <Link
            href={(() => {
              const splitted = path.split('/')
              return `/${splitted[1]}`
            })()}
            className={cn(
              'font-grotesk font-normal text-black text-[30px]',
              isWhite && 'text-black',
            )}
          >
            Home
          </Link>
          <Link
            href={`/${lang}/a-vinicola`}
            className={cn(
              'font-grotesk font-normal text-black text-[30px]',
              isWhite && 'text-black',
            )}
          >
            A Vinícola
          </Link>
          <Link
            href={`/${lang}/produtos`}
            className={cn(
              'font-grotesk font-normal text-black text-[30px]',
              isWhite && 'text-black',
            )}
          >
            Produtos
          </Link>
          <Link
            href={`/${lang}/enoturismo`}
            className={cn(
              'font-grotesk font-normal text-black text-[30px]',
              isWhite && 'text-black',
            )}
          >
            Enoturismo
          </Link>
          <Link
            href={`/${lang}/download`}
            className={cn(
              'font-grotesk font-normal text-black text-[30px]',
              isWhite && 'text-black',
            )}
          >
            Materiais
          </Link>
          <Link
            href={`/${lang}/contato`}
            className={cn(
              'font-grotesk font-normal text-black text-[30px]',
              isWhite && 'text-black',
            )}
          >
            Contato
          </Link>
          <Link
            href={`/${lang}/blog`}
            className={cn(
              'font-grotesk font-normal text-black text-[30px]',
              isWhite && 'text-black',
            )}
          >
            Blog
          </Link>
        </nav>
        <Link href={loja || '#'}>
          <Button className="w-[200px] h-[60px] bg-black rounded-lg text-white font-grotesk font-normal text-xl">
            Nossa loja
          </Button>
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href={(() => {
              const splitted = path.split('/')
              splitted[1] = 'pt'
              return splitted.join('/')
            })()}
          >
            <LogoBrasil className={cn(lang === 'pt' && 'border-2 rounded-full')} />
          </Link>
          <Link
            href={(() => {
              const splitted = path.split('/')
              splitted[1] = 'en'
              return splitted.join('/')
            })()}
          >
            <LogoEua className={cn(lang === 'en' && 'border-2 rounded-full')} />
          </Link>
          <Link
            href={(() => {
              const splitted = path.split('/')
              splitted[1] = 'es'
              return splitted.join('/')
            })()}
          >
            <LogoSpain className={cn(lang === 'es' && 'border-2 rounded-full', 'rounded-full')} />
          </Link>
        </div>
      </div>
    </div>
  )
}
