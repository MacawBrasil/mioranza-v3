'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Button } from '@/components/Button'
import { FormSchema } from '@/lib/schema'
import { cn } from '@/lib/utils'
import { addEntry } from '../../_send'

export function Form() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const result = await addEntry(data)

    if (!result) {
      return
    }

    if (result.error) {
      // set local error state
      return
    }
    reset()
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-[10px]">
      <input
        {...register('nome')}
        placeholder="Nome"
        className={cn(
          'border border-black h-[55px] w-full pl-7 outline-none focus:border-[#E97230] focus:border-2 bg-[#eeede8]',
          errors.nome && 'border-[#E97230] border-2',
        )}
      />
      <input
        {...register('telefone')}
        placeholder="Telefone"
        className={cn(
          'border border-black h-[55px] w-full pl-7 outline-none focus:border-[#E97230] focus:border-2 bg-[#eeede8]',
          errors.telefone && 'border-[#E97230] border-2',
        )}
      />
      <input
        {...register('email')}
        placeholder="Email"
        className={cn(
          ' border border-black h-[55px] w-full pl-7 outline-none focus:border-[#E97230] focus:border-2 bg-[#eeede8]',
          errors.email && 'border-[#E97230] border-2',
        )}
      />
      <div className="w-full flex items-center gap-5">
        <input
          {...register('cidade')}
          placeholder="Cidade"
          className={cn(
            'w-full border border-black h-[55px] pl-7 outline-none focus:border-[#E97230] focus:border-2 bg-[#eeede8]',
            errors.cidade && 'border-[#E97230] border-2',
          )}
        />
        <input
          {...register('uf')}
          placeholder="UF"
          className={cn(
            'w-[106px] border border-black h-[55px] pl-7 outline-none focus:border-[#E97230] focus:border-2 bg-[#eeede8]',
            errors.uf && 'border-[#E97230] border-2',
          )}
        />
      </div>
      <textarea
        {...register('mensagem')}
        placeholder="Mensagem"
        className="w-full border border-black h-[120px] resize-none pl-7 pt-3 outline-none focus:border-[#E97230] focus:border-2 bg-[#eeede8]"
      />
      <div className="flex items-center w-full justify-between">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            {...register('police')}
            required
            className="accent-[#E97230] bg-[#eeede8]"
          />
          <span className="text-[#CEC4C5] text-sm font-grotesk">
            Aceito os termos da política de privacidade
          </span>
        </div>
        <Button
          className="w-[200px] text-black font-grotesk font-normal h-[60px] rounded-lg bg-[#CEC4C5] transition-all hover:bg-transparent hover:border hover:border-black"
          type="submit"
          disabled={isSubmitting === true}
        >
          {isSubmitting ? 'Enviando' : 'Enviar'}
        </Button>
      </div>
    </form>
  )
}
