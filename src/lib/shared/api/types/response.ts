export interface BaseResponse<T> {
  response: Response
  data?: T
}
