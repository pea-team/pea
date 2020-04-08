import React, { ComponentType, Fragment } from 'react'
import { Drawer } from 'antd'
import { DrawerConfig } from './typings'
import { useDawers } from './drawer.hooks'

import 'antd/es/drawer/style'

interface Props {
  config: DrawerConfig
}

export const Drawers: ComponentType<Props> = ({ config }) => {
  const { drawers, setDrawers } = useDawers()

  const close = (name: string) => {
    setDrawers(drawers => {
      drawers[name].visible = false
    })
  }

  const isVisible = (name: string) => {
    return drawers[name] && drawers[name].visible
  }

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
            maskClosable={false}
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
}
