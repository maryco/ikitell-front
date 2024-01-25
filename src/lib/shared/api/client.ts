import { tokenApi } from './requests/security'
import { HttpStatusCode } from './types/http-status'
import { PUBLIC_API_URL, PUBLIC_FRONT_URL } from '$env/static/public'

const hasNoContent = (code: number): boolean => {
  return code === HttpStatusCode.NoContent
}

/**
 *
 * @param response
 * @param data
 * @param error
 * @returns
 */
function makeResponse<T>(response: Response | undefined, data?: T, error?: Error | undefined) {
  const statusCode = response?.status ?? +HttpStatusCode.InternalServerError
  if (!response || error instanceof Error) {
    return {
      response: new Response(null, {
        status: statusCode,
        statusText: `${error}`,
      }),
      data: data,
    }
  } else {
    return {
      response: response,
      data: data,
    }
  }
}

const defaultHeader = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  Origin: `${PUBLIC_FRONT_URL}`,
}

/**
 *
 * @param path
 * @param config
 * @returns
 */
async function http<T>(path: string, config: RequestInit): Promise<T> {
  const url = path.startsWith('http') ? path : `${PUBLIC_API_URL}/${path}`
  const request = new Request(url, config)
  try {
    const response = await fetch(request)

    if (!response.ok) {
      const data =
        response.status === HttpStatusCode.UnprocessableEntity ? await response.json() : {}
      return makeResponse(response, data?.errors) as T
    }

    if (hasNoContent(response.status)) {
      return makeResponse(response) as T
    }

    const data = await response.json()
    // NOTE: Unwrap 'data'
    return makeResponse(response, data.data) as T
  } catch (e: unknown) {
    // console.error(`Fetch error: ${e}`)
    return makeResponse(undefined, undefined, e instanceof Error ? e : undefined) as T
  }
}

/**
 *
 * @returns
 */
function prepareHeaderWithCsrf(): HeadersInit {
  const cookies = document.cookie.split('; ')
  const xsrf = cookies.find((c) => c.startsWith('XSRF-API-TOKEN=')) || ''
  return {
    ...defaultHeader,
    'X-XSRF-TOKEN': decodeURIComponent(xsrf.replace('XSRF-API-TOKEN=', '')),
  }
}

/**
 *
 * @param path
 * @param payload
 * @param _init
 * @returns
 */
export async function postWithCsrf<T, U>(
  path: string,
  payload: T,
  _init?: RequestInit,
): Promise<U> {
  await tokenApi.getCsrf()
  const init = {
    method: 'post',
    headers: prepareHeaderWithCsrf(),
    body: JSON.stringify(payload),
    credentials: 'include',
    ..._init,
  } as RequestInit

  return await http<U>(path, init)
}

/**
 *
 * @param path
 * @param payload
 * @param _init
 * @returns
 */
export async function post<T, U>(path: string, payload: T, _init?: RequestInit): Promise<U> {
  const init = {
    method: 'post',
    headers: defaultHeader,
    credentials: 'include',
    body: JSON.stringify(payload),
    ..._init,
  } as RequestInit

  return await http<U>(path, init)
}

/**
 *
 * @param path
 * @param payload
 * @param _init
 * @returns
 */
export async function putWithCsrf<T, U>(path: string, payload: T, _init?: RequestInit): Promise<U> {
  await tokenApi.getCsrf()
  const init = {
    method: 'put',
    headers: prepareHeaderWithCsrf(),
    body: JSON.stringify(payload),
    credentials: 'include',
    ..._init,
  } as RequestInit

  return await http<U>(path, init)
}

/**
 *
 * @param path
 * @param _init
 * @returns
 */
export async function get<T>(path: string, _init?: RequestInit): Promise<T> {
  const init = {
    method: 'get',
    headers: defaultHeader,
    credentials: 'include',
    ..._init,
  } as RequestInit

  return await http<T>(path, init)
}

export const isAuthError = (code: number): boolean => {
  return code === HttpStatusCode.Unauthorized || code === HttpStatusCode.Forbidden
}

export const isWarningError = (code: number): boolean => {
  // 422 is validation error
  return code === HttpStatusCode.UnprocessableEntity
}
