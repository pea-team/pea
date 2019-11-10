import React, { ComponentType, Fragment } from 'react'
import { Drawer } from 'antd'
import { useStore } from 'stook'
import { DrawerConfig, IDrawers } from './typings'
import { PEA_DRAWER } from './constant'

import 'antd/es/drawer/style'

interface Props {
  config: DrawerConfig
}

export const Drawers: ComponentType<Props> = ({ config }) => {
  const [drawers, updateDrawers] = useStore<IDrawers>(PEA_DRAWER, {})

  const close = (name: string) => {
    updateDrawers(drawers => {
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
