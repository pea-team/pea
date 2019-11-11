import React, { ComponentType, Fragment } from 'react'
import { useStore } from 'stook'
import { Modal } from 'antd'
import { ModalConfig, IModals } from './typings'
import { PEA_MODAL } from './constant'

import 'antd/es/modal/style'

export const Modals: ComponentType<{ config: ModalConfig }> = ({ config }) => {
  const [modals, updateModals] = useStore<IModals>(PEA_MODAL, {})

  const close = (name: string) => {
    updateModals(drawers => {
      drawers[name].visible = false
    })
  }

  const isVisible = (name: string) => {
    return modals[name] && modals[name].visible
  }

  if (!config) return null

  return (
    <Fragment>
      {config.map(({ name, component }) => {
        const Content = component
        const props = Content.modalProps || {}
        return (
          <Modal visible={isVisible(name)} onCancel={() => close(name)} key={name} {...props}>
            <Content />
          </Modal>
        )
      })}
    </Fragment>
  )
}
