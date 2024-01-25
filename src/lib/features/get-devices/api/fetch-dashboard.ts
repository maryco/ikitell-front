import { error, type NumericRange } from '@sveltejs/kit'
import { deviceDashboard } from '$lib/entities/device'
import { userStore } from '$lib/entities/user'
import { deviceApi, http } from '$lib/shared/api'

export async function fetchDashboard() {
  const res = await deviceApi.fetchDashboad()
  if (!res.response.ok) {
    if (http.isAuthError(res.response.status)) {
      userStore.invalidateAuth()
    }
    error(res.response.status as NumericRange<400, 599>, { message: res.response.statusText })
  }

  userStore.update((user) => ({ ...user, isAuthenticated: true }))
  return res.data?.map((item: unknown) => deviceDashboard.parse(item)) ?? []
}
