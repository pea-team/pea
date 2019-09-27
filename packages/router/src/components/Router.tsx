import React from 'react'
import { observe } from '@peajs/store'

import { getFullPath, useMount, useUnmount, createPage } from '../util'
import store from '../routerStore'
import { Routes } from '../typings'

const handlePop = () => {
  store.go({ to: getFullPath(), replace: false })
}

const Router = observe<{ routes: Routes }>(props => {
  const { currentPage, defaultPage, inited } = store

  useMount(() => {
    addEventListener('popstate', handlePop)
    store.init(props.routes)
    store.go({ to: getFullPath() })
  })

  useUnmount(() => {
    removeEventListener('popstate', handlePop)
  })

  const DefaultPage = defaultPage.component

  // TODO: handle default page
  if (!currentPage) {
    return inited ? <DefaultPage /> : null
  }

  return createPage([currentPage], [])
})

export default Router
