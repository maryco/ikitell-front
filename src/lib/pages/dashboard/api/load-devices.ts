import { error, type Load, type NumericRange } from '@sveltejs/kit'
import { http, userApi } from '$lib/shared/api'

export const load: Load = async () => {
  const res = await userApi.getProfile()
  console.log(res)
  if (http.isAuthError(res.response.status)) {
    error(res.response.status as NumericRange<400, 599>, { message: res.response.statusText })
  }
  return {}
}
