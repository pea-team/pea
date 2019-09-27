import fetch from 'cross-fetch'
import { stringify } from 'qs'
import { Options, Body, Params } from './types'

// method with json
const methods = ['POST', 'PUT', 'PATCH', 'DELETE']

function last<T>(arr: T[]): T {
  return arr[arr.length - 1]
}

function getMethod(url: string, options: Options = {}) {
  const arr = url.split(/\s+/)
  if (arr.length === 2) return arr[0]
  const { method = 'GET' } = options
  return method
}

function getDefaultOpt(url: string, options: Options = {}): RequestInit {
  const method = getMethod(url, options)
  const baseOpt = { method, headers: {} } as Options
  const isJsonTypeMethod = method && methods.includes(method)
  if (isJsonTypeMethod) {
    baseOpt.headers = { 'content-type': 'application/json; charset=utf-8' }
  }
  return baseOpt as RequestInit
}

function setUrlParam(url: string = '', params: Params) {
  return url
    .split('/')
    .map(item => {
      if (item.startsWith(':')) {
        return params[item.replace(/^\:/, '')]
      }
      return item
    })
    .join('/')
}

function getURL(url: string, options?: Options) {
  // handle something like fetch('POST /todos')
  url = last(url.split(/\s+/))

  if (options && options.params) url = setUrlParam(url, options.params)

  const qs = getQueryString(options)
  if (!qs) return url
  const connector = url.indexOf('?') > -1 ? '' : '?'

  return url + connector + qs
}

function getQueryString(options?: Options) {
  if (!options || !options.query) return null
  return stringify(options.query)
}

function getBody(body?: Body): Body {
  if (!body) return null
  const isJsonObject =
    typeof body && (body.constructor.name === 'Object' || body.constructor.name === 'Array')
  if (isJsonObject) return JSON.stringify(body)
  return body
}

function getOpt(url: string, options?: Options): RequestInit {
  const defaultOpt = getDefaultOpt(url, options)
  if (!options) return defaultOpt
  const body = getBody(options.body)
  if (body) options.body = body
  const { headers } = options
  options.headers = { ...defaultOpt.headers, ...headers }
  return { ...defaultOpt, ...options } as RequestInit
}

async function getErrorMsg(error: any): Promise<any> {
  if (!error) throw 'network error!'
  if (typeof error !== 'object') throw error
  if ('json' in error) {
    const msg = await error.json()
    if (msg) return msg
  }

  if ('blob' in error) {
    const msg = await error.blob()
    if (msg) return msg
  }
  return error
}

export async function request<T = any>(url: string, options?: Options): Promise<T> {
  const input = getURL(url, options)
  const init = getOpt(url, options)

  try {
    const response = await fetch(input, init)
    if (response.status >= 200 && response.status < 300) {
      const { type = 'json' } = options || ({} as Options)
      const data: T = await response[type]()
      return data
    } else {
      throw response
    }
  } catch (error) {
    // TODO: need to support raw response
    throw await getErrorMsg(error)
  }
}
