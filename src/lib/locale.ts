import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

export type Locale = (typeof locales)[number]

export const locales = ['pt', 'en', 'es'] as const
const defaultLocale: Locale = 'pt'

/**
 * Valida se um valor é um locale válido
 * @param value - Valor a ser validado
 * @returns true se for um locale válido, false caso contrário
 */
export function isValidLocale(value: unknown): value is Locale {
  return typeof value === 'string' && locales.includes(value as Locale)
}

/**
 * Normaliza um locale, retornando o default se for inválido
 * @param value - Valor a ser normalizado
 * @returns Locale válido
 */
export function normalizeLocale(value: unknown): Locale {
  return isValidLocale(value) ? value : defaultLocale
}

/**
 * Obtém o pathname atual sem o locale
 * @param pathname - Pathname completo
 * @returns Pathname sem o locale
 */
export function getPathnameWithoutLocale(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean)
  if (segments.length > 0 && isValidLocale(segments[0])) {
    return '/' + segments.slice(1).join('/')
  }
  return pathname
}

function getPreferredLocale(headers: Headers): string {
  try {
    const acceptLanguage = headers.get('accept-language') || ''
    const languages = new Negotiator({
      headers: { 'accept-language': acceptLanguage },
    }).languages()
    return match(languages, Array.from(locales), defaultLocale)
  } catch (error: unknown) {
    // Se falhar, retorna o locale padrão
    return defaultLocale
  }
}

export function localizedRedirectPath(pathname: string, headers: Headers): string | null {
  try {
    // Valida entradas
    if (!pathname || typeof pathname !== 'string') {
      return null
    }

    if (!headers || typeof headers.get !== 'function') {
      return null
    }

    // Normaliza o pathname removendo barras duplicadas e garantindo que comece com /
    const normalizedPath = pathname === '/' ? '/' : pathname.replace(/\/+/g, '/')

    const pathnameIsMissingLocale = locales.every(
      locale => !normalizedPath.startsWith(`/${locale}/`) && normalizedPath !== `/${locale}`,
    )

    if (pathnameIsMissingLocale) {
      try {
        const locale = getPreferredLocale(headers)

        // Se o pathname é apenas "/", retorna apenas o locale
        if (normalizedPath === '/') {
          return `/${locale}`
        }

        // Garante que não há duplicação de barras ao concatenar
        // normalizedPath já começa com /, então apenas concatenamos
        return `/${locale}${normalizedPath}`
      } catch (localeError: unknown) {
        // Se falhar ao obter locale, retorna null silenciosamente
        return null
      }
    }

    return null
  } catch (error: unknown) {
    // Em caso de erro, retorna null para permitir que a requisição continue
    // Erro silenciosamente ignorado para evitar crash do app
    return null
  }
}
