export interface Result<T> {
  data?: T
  headers: Headers
  status: number
  errors?: any
}

export interface Variables {
  [key: string]: any
}

export interface Headers {
  [key: string]: string
}

export interface Options {
  endpoint: string
  headers?: Headers
}
