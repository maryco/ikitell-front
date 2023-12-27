import type { BaseResponse } from './response'

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse extends BaseResponse<unknown> {}
