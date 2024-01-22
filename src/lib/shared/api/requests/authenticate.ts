import * as client from '../client'
import type { LoginRequest, LoginResponse } from '../types/login'
import type { BaseResponse } from '../types/response'

export const authApi = {
  login: async (payload: LoginRequest): Promise<LoginResponse> => {
    return await client.postWithCsrf<LoginRequest, LoginResponse>('login', payload)
  },

  logout: async (): Promise<BaseResponse<unknown>> => {
    return await client.postWithCsrf<unknown, BaseResponse<unknown>>('logout', {})
  },
}
