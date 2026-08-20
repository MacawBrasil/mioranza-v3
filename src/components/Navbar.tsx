'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Locale } from '@/lib/locale'
import { cn } from '@/lib/utils'
import { Button } from './Button'
import { Logo, LogoBrasil, LogoEua, LogoSpain, WhiteLogo } from './SVGS'

interface iNavbar {
  isWhite?: boolean
  loja: string | null | undefined
  lang: Locale
}

export function Navbar({ isWhite, loja, lang }: iNavbar) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const path = usePathname()
  return (
    <div
      className={cn(
        'w-screen fixed top-0 left-0 z-50 bg-transparent flex items-center transition-all justify-center py-[25px] xl:hidden',
        scrolled && 'bg-black/45 backdrop-blur',
      )}
    >
      <div className=" flex items-center gap-[75px] md:justify-around 1xl:gap-[55px]">
        <Link
          href={(() => {
            const splitted = path.split('/')
            return `/${splitted[1]}`
          })()}
        >
          {isWhite && scrolled ? (
            <Logo className="w-[150px] h-[50px]" />
          ) : isWhite ? (
            <WhiteLogo className="w-[150px] h-[50px]" />
          ) : (
            <Logo className="w-[150px] h-[50px]" />
          )}
        </Link>
        <nav className="flex items-center gap-[50px]">
          <Link
            href={(() => {
              const splitted = path.split('/')
              return `/${splitted[1]}`
            })()}
            className={cn(
              'font-grotesk font-normal text-white text-[18px] relative',
              path === `/${lang}` &&
                'after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:rounded-full after:bg-white',
              isWhite && 'text-black',
              isWhite && scrolled && 'text-white',
              isWhite && path === `/${lang}` && 'after:bg-black',
            )}
          >
            Home
          </Link>
          <Link
            href={`/${lang}/a-vinicola`}
            className={cn(
              'font-grotesk font-normal text-white text-[18px] relative text-nowrap',
              path === `/${lang}/a-vinicola` &&
                'after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:rounded-full after:bg-white',
              isWhite && 'text-black',
              isWhite && scrolled && 'text-white',
              isWhite && path === `/${lang}/a-vinicola` && 'after:bg-black',
            )}
          >
            A Vinícola
          </Link>
          <Link
            href={`/${lang}/produtos`}
            className={cn(
              'font-grotesk font-normal text-white text-[18px] relative',
              path === `/${lang}/produtos` &&
                'after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:rounded-full after:bg-white',
              isWhite && 'text-black',
              isWhite && scrolled && 'text-white',
              isWhite && path === `/${lang}/produtos` && 'after:bg-black',
              isWhite && path === `/${lang}/produtos` && scrolled && 'after:bg-white',
            )}
          >
            Produtos
          </Link>
          <Link
            href={`/${lang}/enoturismo`}
            className={cn(
              'font-grotesk font-normal text-white text-[18px] relative',
              path === `/${lang}/enoturismo` &&
                'after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:rounded-full after:bg-white',
              isWhite && 'text-black',
              isWhite && scrolled && 'text-white',
              isWhite && path === `/${lang}/enoturismo` && 'after:bg-black',
              isWhite && path === `/${lang}/enoturismo` && scrolled && 'after:bg-white',
            )}
          >
            Enoturismo
          </Link>
          <Link
            href={`/${lang}/download`}
            className={cn(
              'font-grotesk font-normal text-white text-[18px] relative',
              path === `/${lang}/download` &&
                'after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:rounded-full after:bg-white',
              isWhite && 'text-black',
              isWhite && scrolled && 'text-white',
              isWhite && path === `/${lang}/download` && 'after:bg-black',
              isWhite && path === `/${lang}/download` && scrolled && 'after:bg-white',
            )}
          >
            Materiais
          </Link>
          <Link
            href={`/${lang}/contato`}
            className={cn(
              'font-grotesk font-normal text-white text-[18px] relative',
              path === `/${lang}/contato` &&
                'after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:rounded-full after:bg-white',
              isWhite && 'text-black',
              isWhite && scrolled && 'text-white',
              isWhite && path === `/${lang}/contato` && 'after:bg-black',
              isWhite && path === `/${lang}/contato` && scrolled && 'after:bg-white',
            )}
          >
            Contato
          </Link>
          <Link
            href={`/${lang}/blog`}
            className={cn(
              'font-grotesk font-normal text-white text-[18px] relative',
              path === `/${lang}/blog` &&
                'after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:rounded-full after:bg-white',
              isWhite && 'text-black',
              isWhite && scrolled && 'text-white',
              isWhite && path === `/${lang}/blog` && 'after:bg-black',
              isWhite && path === `/${lang}/blog` && scrolled && 'after:bg-white',
            )}
          >
            Blog
          </Link>
        </nav>
        <a href={`${loja}`} className="1366p:hidden">
          <Button
            className={cn(
              'w-[200px] h-[60px] rounded-lg bg-[#CEC4C5] 1xl:w-[150px] text-black font-grotesk font-normal transition-all hover:bg-transparent hover:border hover:text-white',
              isWhite && 'hover:border-black hover:text-black',
            )}
          >
            Nossa loja
          </Button>
        </a>
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
