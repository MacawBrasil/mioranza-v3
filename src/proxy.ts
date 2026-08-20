import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { locales, localizedRedirectPath } from './lib/locale'

export function proxy(request: NextRequest): NextResponse {
  try {
    const url = new URL(request.url)
    const pathname = url.pathname
    const headersList = request.headers

    // Extrai o primeiro segmento do pathname
    const pathSegments = pathname.split('/').filter(Boolean)
    const firstSegment = pathSegments[0]

    // Verifica se o primeiro segmento é um locale válido
    const isValidLocale = firstSegment && locales.includes(firstSegment as (typeof locales)[number])

    // Se não tem locale válido OU se tem um locale inválido, redireciona
    if (!isValidLocale) {
      const localizedRedirect = localizedRedirectPath(pathname, headersList)

      if (localizedRedirect) {
        const redirectUrl = new URL(localizedRedirect, request.url)

        // Evita redirecionamento para a mesma URL (loop infinito)
        if (redirectUrl.pathname !== pathname) {
          // Usa redirect temporário (307) para garantir funcionamento em produção
          // 307 preserva o método HTTP e é mais confiável que 302
          return NextResponse.redirect(redirectUrl, 307)
        }
      }
    }

    // Se tem locale válido, permite que a requisição continue
    return NextResponse.next()
  } catch (error: unknown) {
    // Em caso de erro, permite que a requisição continue
    // Isso evita que o app crashe completamente
    // Erro silenciosamente ignorado para evitar crash do app
    return NextResponse.next()
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - admin (Payload CMS admin)
     * - files with extensions (e.g. .jpg, .png, .svg, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|admin|.*\\..+).*)',
  ],
}
