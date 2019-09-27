import { request } from '@peajs/request'
import { Options, Variables, Headers } from './typings'

export interface QueryOptions {
  headers?: Headers
}

export class GraphQLClient {
  constructor(private readonly options: Options) {}

  async query<T = any>(
    input: string,
    variables: Variables = {},
    options: QueryOptions = { headers: {} },
  ): Promise<T> {
    const { headers: queryOptionsHeaders } = options
    const { endpoint, headers: optionsHeaders } = this.options
    const body = { query: input, variables }
    try {
      const res = await request(endpoint, {
        method: 'POST',
        body,
        headers: { ...optionsHeaders, ...queryOptionsHeaders },
      })
      if (res.data) return res.data
      throw res
    } catch (error) {
      throw error
    }
  }
}

export async function query<T = any>(
  endpoint: string,
  input: string,
  variables?: Variables,
  options?: QueryOptions,
): Promise<T> {
  const client = new GraphQLClient({ endpoint })
  return client.query<T>(input, variables, options)
}
