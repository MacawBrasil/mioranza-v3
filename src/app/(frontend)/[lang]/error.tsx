'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error)
  }, [error])

  return (
    <div className="min-h-[60vh] w-full flex flex-col items-center justify-center gap-4 px-6 text-center">
      <h2 className="text-2xl font-bold">Algo deu errado</h2>
      <p className="text-base text-[#1E1E1E]">
        Ocorreu um erro ao carregar esta página. Tente novamente.
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="mt-2 rounded-md bg-[#E97230] px-6 py-2 font-semibold text-white"
      >
        Tentar novamente
      </button>
    </div>
  )
}
