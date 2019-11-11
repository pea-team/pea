import React, { FC } from 'react'
import { Popover } from 'antd'
import { useStore } from 'stook'
import { PopoverProps } from 'antd/lib/popover'
import { popupStore } from './popupStore'
import { PEA_POPUP } from './constant'
import { Popups, PopupItem } from './typings'


import 'antd/es/popover/style'

export interface PopupProps extends PopoverProps {
  name: string
}

export const Popup: FC<PopupProps> = props => {
  const [popups] = useStore<Popups>(PEA_POPUP, [])
  const handleVisibleChange = (visible: boolean) => {
    const { name } = props
    const action = visible ? 'open' : 'close'
    popupStore[action](name)
  }

  const getActivePopups = () => {
    const { name } = props
    const popup = popups.find(item => item.name === name)
    return popup || ({} as PopupItem)
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
