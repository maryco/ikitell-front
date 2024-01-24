import * as client from '../client'
import type { DeviceDashboardResponse, DeviceReportResponse } from '../types/device'

export const deviceApi = {
  fetchDashboad: async (): Promise<DeviceDashboardResponse> => {
    return await client.get<DeviceDashboardResponse>('devices')
  },

  reports: async (id: number): Promise<DeviceReportResponse> => {
    return await client.putWithCsrf<unknown, DeviceReportResponse>(`devices/${id}/reports`, {})
  },
}
