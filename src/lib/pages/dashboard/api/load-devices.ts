import { type Load } from '@sveltejs/kit'
import { fetchDeviceDashboard } from '$lib/features/get-devices'

export const load: Load = async ({ depends }) => {
  const devices = await fetchDeviceDashboard()

  depends('feature:report-devices')

  return {
    devices: devices,
  }
}
