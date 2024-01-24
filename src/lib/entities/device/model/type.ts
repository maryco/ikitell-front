import * as zod from 'zod'

export const deviceDashboard = zod.object({
  id: zod.number(),
  name: zod.string(),
  resetWord: zod.string(),
  lastResetAt: zod
    .string()
    .datetime({ offset: true })
    .nullable()
    .transform((val) => (val ? new Date(val) : null)),
  inAlerting: zod.boolean(),
  isSuspend: zod.boolean(),
  enableReset: zod.boolean(),
  baseDate: zod.string().datetime({ offset: true }).nullable(),
  remainingTime: zod.number(),
  limitTime: zod.number(),
  timerExpiresIn: zod
    .string()
    .datetime({ offset: true })
    .nullable()
    .transform((val) => (val ? new Date(val) : null)),
})

export type DeviceDashboardSchema = zod.infer<typeof deviceDashboard>
