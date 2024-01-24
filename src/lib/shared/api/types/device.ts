import type { BaseResponse } from './response'

export type DeviceDashboard = {
  id: number
  name: string
  resetWord: string
  lastResetAt?: string | null
  inAlerting: boolean
  isSuspend: boolean
  enableReset: boolean
  baseDate: string
  remainingTime: number
  limitTime: number
  timerExpiresIn: string
}

export interface DeviceDashboardResponse extends BaseResponse<DeviceDashboard[]> {}

export interface DeviceReportResponse extends BaseResponse<DeviceDashboard> {}
