type Method = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH' | 'HEAD'

interface BodyObject {
  [key: string]: any
}

export interface Query {
  [key: string]: any
}

export type Body =
  | Blob
  | BufferSource
  | FormData
  | URLSearchParams
  | ReadableStream<Uint8Array>
  | string
  | BodyObject
  | any[]
  | null

export interface Params {
  [key: string]: string | number | boolean
}

export type Type = 'text' | 'json' | 'blob' | 'arrayBuffer' | 'formData'

export interface Options {
  query?: Query
  body?: Body
  params?: Params
  cache?: RequestCache
  credentials?: RequestCredentials
  headers?: HeadersInit
  integrity?: string
  keepalive?: boolean
  method?: Method
  type?: Type
  mode?: RequestMode
  redirect?: RequestRedirect
  referrer?: string
  referrerPolicy?: ReferrerPolicy
  signal?: AbortSignal | null
  window?: any
}
