import * as client from '../client'
import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public'

export const tokenApi = {
  getCsrf: async () => {
    return await client.get<Response>(`${PUBLIC_BACKEND_BASE_URL}/sanctum/csrf-cookie`, {
      credentials: 'include',
    })
  },
}
