import React, { FC } from 'react'
import { Popover } from 'antd'
import { PopoverProps } from 'antd/lib/popover'
import { popupStore } from './popupStore'

export interface PopupProps extends PopoverProps {
  name: string
}

export const Popup: FC<PopupProps> = props => {
  const handleVisibleChange = (visible: boolean) => {
    const { name } = props
    const action = visible ? 'open' : 'close'
    popupStore[action](name)
  }

  const getActivePopups = () => {
    const { name } = props
    const { popups } = popupStore
    const popup = popups.find(item => item.name === name)
    return popup || {}
  }
  const popup = getActivePopups()
  return (
    <Popover
      trigger="click"
      visible={popup.isOpen}
      onVisibleChange={handleVisibleChange}
      {...props}
    >
      {props.children}
    </Popover>
  )
}
