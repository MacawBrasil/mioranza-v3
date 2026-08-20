import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

// Relacionamentos do GraphQL podem vir como o id (string) ou o documento populado
export function relationId(relation: string | { id: string }): string {
  return typeof relation === 'string' ? relation : relation?.id
}
