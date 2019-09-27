import React, { ComponentType, Fragment } from 'react'
import { observe } from '@peajs/store'
import { DefaultModalContainer } from './DefaultModalContainer'
import { modalStore } from './modalStore'
import { ModalConfig } from './typings'

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
    const { ModalContainer } = modalStore

    const Modal = ModalContainer || DefaultModalContainer
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
