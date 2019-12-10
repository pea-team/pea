import { request, Options } from '@peajs/request'
import { serializeFetchParameter } from 'apollo-link-http-common'
import { parse } from 'graphql'
import { Variables } from './typings'

const { extractFiles } = require('extract-files')

export class GraphQLClient {
  constructor(private readonly endpoint: string, private readonly clientOptions: Options = {}) {}

  private getOperationName(input: string) {
    try {
      return (parse(input).definitions[0] as any).name.value
    } catch (error) {
      return ''
    }
  }

  private getOptions(input: string, variables: Variables, queryOptions: Options): Options {
    let opt: Options = { ...this.clientOptions, ...queryOptions }

    const body = {
      operationName: this.getOperationName(input),
      query: input,
      variables,
    }

    const { clone, files } = extractFiles(body)
    const payload = serializeFetchParameter(clone, 'Payload')

    // not files
    if (!files.size) {
      opt.body = payload

      // has files
    } else {
      opt.headers && delete opt.headers['content-type']

      const form = new FormData()
      form.append('operations', payload)

      const map: any = {}
      let i = 0
      files.forEach((paths: string[]) => {
        map[++i] = paths
      })
      form.append('map', JSON.stringify(map))

      i = 0
      files.forEach((_: any, file: File) => {
        form.append(`${i + 1}`, file, file.name)
      })
      opt.body = form
      opt.type = 'formData'
    }

    opt.method = opt.method || 'POST'

    return opt
  }

  query = async <T = any>(
    input: string,
    variables: Variables = {},
    options: Options = {},
  ): Promise<T> => {
    const opt = this.getOptions(input, variables, options)
    try {
      const res = await request(this.endpoint, opt)
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
  variables: Variables = {},
  options: Options = {},
): Promise<T> {
  const client = new GraphQLClient(endpoint)
  return client.query<T>(input, variables, options)
}
