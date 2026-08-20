import { locales } from '@/lib/locale'

/**
 * Gera estaticamente as três variantes de idioma (pt/en/es) para toda a
 * subárvore `[lang]`. As páginas com segmento próprio (`[slug]`) declaram o
 * seu próprio `generateStaticParams`, recebendo `lang` deste layout.
 */
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export default function LangLayout({ children }: { children: React.ReactNode }) {
  return children
}
