/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import sgMail from '@sendgrid/mail'
import { type z } from 'zod'

import { FormSchema } from '@/lib/schema'
import { fetchSetting } from './_api/fetchGlobals'

sgMail.setApiKey(`${process.env.SENDGRID_API_KEY}`)

type Inputs = z.infer<typeof FormSchema>

export async function addEntry(data: Inputs) {
  const result = FormSchema.safeParse(data)
  const settings = await fetchSetting()

  const dests = settings?.destinatarios?.map(dest => dest.email)

  if (result.success) {
    try {
      await sgMail.send({
        to: dests,
        from: `Nova mensagem do site Mioranza <enviosmacaw@gmail.com>`,
        subject: `Nova mensagem vinda do site Mioranza - Contato`,
        replyTo: result.data.email,
        html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
          <html lang="pt">
            <body>
              <div style="margin-left: 20px;margin-right: 20px; font-family: sans-serif;">
                <p><b>Nome:</b> ${result.data.nome}</p>
                <p><b>E-mail:</b> ${result.data.email}</p>
                <p><b>Telefone:</b> ${result.data.telefone}</p>
                <p><b>Cidade:</b> ${result.data.cidade}</p>
                <p><b>UF:</b> ${result.data.uf}</p>
                ${
                  result.data.mensagem &&
                  `<div style="font-size: 16px;">
                <b>Mensagem:</b><br />
                <p>${result.data.mensagem}</p>
              </div>`
                }
              </div>
            </body>
          </html>`,
      })

      return { ok: true }
    } catch (error: unknown) {
      return { error: true }
    }
  }
  return { success: false, error: result.error.format() }
}
