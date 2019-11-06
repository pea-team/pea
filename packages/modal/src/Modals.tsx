import React, { ComponentType, Fragment } from 'react'
import { observe } from '@peajs/store'
import { Modal } from 'antd'
import { modalStore } from './modalStore'
import { ModalConfig } from './typings'

import 'antd/es/modal/style'

const handleCancel = (name: string) => {
  modalStore.close(name)
}

const isVisible = (name: string) => {
  const { modals } = modalStore
  return modals[name] && modals[name].visible
}

export const Modals: ComponentType<{ config: ModalConfig }> = observe<{ config: ModalConfig }>(
  ({ config }) => {
    if (!config) return null

    return (
      <Fragment>
        {config.map(({ name, component }) => {
          const Content = component
          const props = Content.modalProps || {}
          return (
            <Modal
              visible={isVisible(name)}
              onCancel={() => handleCancel(name)}
              key={name}
              {...props}
            >
              <Content />
            </Modal>
          )
        })}
      </Fragment>
    )
  },
)
