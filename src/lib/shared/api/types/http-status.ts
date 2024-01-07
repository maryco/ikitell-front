export const HttpStatusCode = {
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NoContent: 204,

  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,

  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  Conflict: 409,
  CsrfTokenMismatch: 419, // from Laravel
  UnprocessableEntity: 422,

  InternalServerError: 500,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
} as const

export const isAuthError = (status: number) => {
  return [+HttpStatusCode.Unauthorized, +HttpStatusCode.Forbidden].includes(status)
}

export type HttpStatusCode = (typeof HttpStatusCode)[keyof typeof HttpStatusCode]
