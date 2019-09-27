import { useState, useEffect } from 'react'
import { query } from './query'
import fetcher from './fetcher'

import { Options, QueryResult, Deps, Refetch } from './types'

function getDeps(options?: Options): Deps {
  if (options && Array.isArray(options.deps)) return options.deps
  return []
}

export function useQuery<T = any>(input: string, options: Options = {}) {
  let unmounted = false
  const initialState = { loading: true } as QueryResult<T>
  const deps = getDeps(options)
  const [result, setState] = useState(initialState)

  const fetchData = async (opt: Options = {}) => {
    setState(prev => ({ ...prev, loading: true }))
    try {
      const data = await query<T>(input, opt || {})
      if (!unmounted) setState(prev => ({ ...prev, loading: false, data }))
      return data
    } catch (error) {
      if (!unmounted) setState(prev => ({ ...prev, loading: false, error }))
      return error
    }
  }

  const refetch: Refetch = async <P = any>(opt?: Options): Promise<P> => {
    const refetchedData: any = await fetchData(opt)
    return refetchedData as P
  }

  useEffect(() => {
    fetchData(options)

    // store refetch fn to fetcher
    if (options && options.name) {
      fetcher[options.name] = { refetch }
    }

    return () => {
      unmounted = true
    }
  }, deps)

  return { ...result, refetch }
}
