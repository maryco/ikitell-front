import type { BaseResponse } from './response'

export type UserProfile = {
  id: number
  email: string
}

export interface ProfileResponse extends BaseResponse<UserProfile> {}
