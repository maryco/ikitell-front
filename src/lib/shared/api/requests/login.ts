import * as client from '../client'
import type { LoginRequest, LoginResponse } from '../types/login'

export const authApi = {
  login: async (payload: LoginRequest): Promise<LoginResponse | undefined> => {
    return await client.postWithCsrf<LoginRequest, LoginResponse>('login', payload)
  },

  // logout: async () => {}
}
