import { z } from 'zod'

export const FormSchema = z.object({
  nome: z.string().min(2),
  telefone: z.string().min(2),
  email: z.string().email(),
  cidade: z.string().min(2),
  uf: z.string().min(2),
  mensagem: z.string().optional(),
  police: z.boolean(),
})
