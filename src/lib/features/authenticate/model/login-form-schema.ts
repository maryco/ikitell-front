import * as zod from 'zod'

export const loginSchema = zod.object({
  email: zod.string().email().min(1),
  password: zod.string().min(1),
})
