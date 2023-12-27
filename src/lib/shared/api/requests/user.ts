import * as client from '../client'
import type { ProfileResponse } from '../types/user'

export const userApi = {
  getProfile: async (): Promise<ProfileResponse> => {
    return await client.get<ProfileResponse>('profile')
  },
}
