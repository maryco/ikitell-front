import { tokenApi } from './requests/security'
import { HttpStatusCode } from './types/http-status'
import { PUBLIC_API_URL, PUBLIC_FRONT_URL } from '$env/static/public'

const hasNoContent = (code: number): boolean => {
  return code === HttpStatusCode.NoContent
}

const defaultHeader = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  Origin: `${PUBLIC_FRONT_URL}`,
}

async function http<T>(path: string, config: RequestInit): Promise<T> {
  const url = path.startsWith('http') ? path : `${PUBLIC_API_URL}/${path}`
  const request = new Request(url, config)
  const response = await fetch(request)

  if (!response.ok) {
    // TODO
    console.error(`Error: status ${response.status} | message ${response.statusText}`)
  }

  if (hasNoContent(response.status)) {
    return {} as T
  }

  const data = await response.json()
  return { response: response, data: data } as T
}

function prepareHeaderWithCsrf(): HeadersInit {
  const cookies = document.cookie.split('; ')
  const xsrf = cookies.find((c) => c.startsWith('XSRF-TOKEN=')) || ''
  return {
    ...defaultHeader,
    'X-XSRF-TOKEN': decodeURIComponent(xsrf.replace('XSRF-TOKEN=', '')),
  }
}

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
