import React from 'react'
import { NO_ROUTE_MATCH, PEA_ROUTER } from './constant'

import { setFullPath, findDefaultPage, updateRouterState } from './util'

import { Page, State, Routes } from './typings'
import { useStore } from 'stook'

const defaultPage = {
  fullPath: '**',
  component: () => <div>{NO_ROUTE_MATCH}</div>,
  root: false,
  default: false,
  parentPath: '',
} as Page

export function useRouter() {
  const [state, set] = useStore<State>(PEA_ROUTER, {
    inited: false,
    defaultPage,
    pages: [],
    params: {},
    currentPath: '',
    currentPage: null,
  })

  function init(routes: Routes) {
    set(store => {
      const pages = setFullPath(routes, '')
      store.pages = pages
      store.defaultPage = findDefaultPage(pages) || store.defaultPage
    })
  }

  function navigate(to: string, replace?: boolean) {
    set(state => {
      updateRouterState(state, to, replace)
    })
  }

  return { state, init, navigate }
}
