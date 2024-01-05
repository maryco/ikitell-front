import * as zod from 'zod'
import type { BaseResponse } from './response'

export const loginRequest = zod.object({
  email: zod.string(),
  password: zod.string(),
})

export type LoginRequest = zod.infer<typeof loginRequest>
export interface LoginResponse extends BaseResponse<unknown> {}
