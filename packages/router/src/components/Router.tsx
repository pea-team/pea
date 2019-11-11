import React, { FC, memo } from 'react'

import { getFullPath, useMount, useUnmount, createPage } from '../util'
import { useRouter } from '../useRouter'
import { Routes } from '../typings'

const Router: FC<{ routes: Routes }> = props => {
  const { state, init, navigate } = useRouter()
  const { currentPage, defaultPage, inited } = state

  useMount(() => {
    document.addEventListener('popstate', handlePop)
    init(props.routes)
    navigate(getFullPath())
  })

  useUnmount(() => {
    document.removeEventListener('popstate', handlePop)
  })

  const handlePop = () => {
    navigate(getFullPath(), false)
  }

  const DefaultPage = defaultPage.component

  // TODO: handle default page
  if (!currentPage) {
    return inited ? <DefaultPage /> : null
  }

  return createPage([currentPage], [])
}

export default memo(Router)
