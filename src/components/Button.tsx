import { ComponentProps } from 'react'

interface iButton extends ComponentProps<'button'> {}

export function Button({ ...props }: iButton) {
  return <button {...props}></button>
}
