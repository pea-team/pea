import React, { ComponentType, Fragment } from 'react'
import { Drawer } from 'antd'
import { observe } from '@peajs/store'
import { drawerStore } from './drawerStore'
import { DrawerConfig } from './typings'

import 'antd/es/drawer/style'

const close = (name: string) => {
  drawerStore.close(name)
}

const isVisible = (name: string) => {
  const { drawers } = drawerStore
  return drawers[name] && drawers[name].visible
}

interface Props {
  config: DrawerConfig
}

export const Drawers: ComponentType<Props> = observe<Props>(({ config }) => {
  if (!config) return null

  return (
    <Fragment>
      {config.map(({ name, component }) => {
        const Content = component
        const props = Content.drawerProps || {}
        return (
          <Drawer
            visible={isVisible(name)}
            onClose={() => close(name)}
            width={720}
            key={name}
            {...props}
          >
            <Content />
          </Drawer>
        )
      })}
    </Fragment>
  )
})
