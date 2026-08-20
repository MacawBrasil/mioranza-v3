import type { Access, FieldAccess } from 'payload'

import { checkRole } from '@/collections/Users/checkRole'

// Usable both as collection-level access and field-level access
export const admins: Access & FieldAccess = ({ req: { user } }) => {
  return checkRole(['admin'], user)
}
