import React from 'react'
import { createStore } from '@peajs/store'
import { NO_ROUTE_MATCH } from './constant'
import { interceptors } from './interceptor'

import {
  pushState,
  replaceState,
  setFullPath,
  findRooPage,
  findDefaultPage,
  getParams,
} from './util'

import { Page } from './typings'

interface Route {
  path?: string
  component?: any
  children?: Routes
}
type Routes = Route[]
interface Params {
  [key: string]: any
}

const defaultPage = {
  fullPath: '**',
  component: () => <div>{NO_ROUTE_MATCH}</div>,
  root: false,
  default: false,
  parentPath: '',
} as Page
const currentPath = ''
const currentPage = null as (Page | null)
const pages: Page[] = []
const params: Params = {}

const store = createStore({
  inited: false,
  defaultPage,
  pages,
  params,
  currentPath,
  currentPage,
  init(routes: Routes) {
    const pages = setFullPath(routes, '')
    store.pages = pages
    store.defaultPage = findDefaultPage(pages) || store.defaultPage
  },
  go({ to, replace }: { to: string; replace?: boolean }) {
    let path: string = '',
      search: string = ''

    if (to.indexOf('?') > -1) {
      const arr = to.split('?')
      path = arr[0]
      search = '?' + arr[1]
    } else {
      path = to
    }

    const { pages } = store
    const rootPage = findRooPage(pages, path)

    // handle interceptors
    if (interceptors.length) {
      let canNext = false
      for (const intercept of interceptors) {
        canNext = false
        intercept(
          {
            to: path,
            from: store.currentPath,
          },
          () => (canNext = true),
        )
        if (!canNext) break
      }

      if (!canNext) return
    }

    if (!store.inited) {
      store.inited = true
    }

    if (rootPage) {
      const params = getParams([rootPage], to)
      store.currentPath = path
      store.currentPage = rootPage
      store.params = params || {}
      replace ? replaceState(path + search) : pushState(path + search)
    }
  },
})

export default store
