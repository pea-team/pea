import { useState, useEffect } from 'react'
import { query } from './query'
import { fetcher } from './fetcher'

import { Options, QueryResult, Deps, Refetch, FetcherItem } from './types'

function getDeps(options?: Options): Deps {
  if (options && Array.isArray(options.deps)) return options.deps
  return []
}

export enum Stage {
  loading = 10,
  success = 20,
  error = 21,
  refetching = 30,
}

export function useQuery<T = any>(input: string, options: Options<T> = {}) {
  const { data, onChange } = options
  let unmounted = false
  const initialState = { loading: true, data } as QueryResult<T>
  const deps = getDeps(options)
  const [result, setState] = useState(initialState)
  const fetcherName = options.name || input

  function update(updatedState: Partial<QueryResult<T>>) {
    const newState = { ...result, ...updatedState }
    setState(newState)
    onChange && onChange(newState)
  }

  const doFetch = async (opt: Options = {}) => {
    try {
      const data = await query<T>(input, opt || {})
      if (!unmounted) {
        update({ loading: false, data })
      }
      return data
    } catch (error) {
      if (!unmounted) {
        update({ loading: false, error })
      }
      return error
    }
  }

  const refetch: Refetch = async <P = any>(opt?: Options): Promise<P> => {
    const refetchedData: any = await doFetch(opt)
    return refetchedData as P
  }

  useEffect(() => {
    doFetch(options)

    // store refetch fn to fetcher
    fetcher.set(fetcherName, { refetch } as FetcherItem<T>)

    return () => {
      unmounted = true
    }
  }, deps)

  return { ...result, refetch }
}
