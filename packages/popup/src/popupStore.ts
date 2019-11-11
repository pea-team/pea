import { mutate, getState } from 'stook'
import { PEA_POPUP } from './constant'
import { Popups } from './typings'

export const popupStore = {
  open(name: string) {
    const popups = getState<Popups>(PEA_POPUP)
    if (!popups) return

    if (isPopupExist(popups, name)) {
      mutate(PEA_POPUP, (popups: Popups) => {
        for (const item of popups) {
          if (item.name === name) {
            item.isOpen = true
          }
        }
      })
      return
    }

    mutate(PEA_POPUP, (popups: Popups) => {
      popups.push({
        name,
        data: {},
        isOpen: true,
      })
    })
  },

  close(name: string) {
    mutate(PEA_POPUP, (popups: Popups) => {
      for (const item of popups) {
        if (item.name === name) {
          item.isOpen = false
        }
      }
    })
  },

  closeAll() {
    mutate(PEA_POPUP, (popups: Popups) => {
      for (const item of popups) {
        item.isOpen = false
      }
    })
  },

  get(name: string) {
    const popups = getState(PEA_POPUP) as Popups
    return popups.find(item => (item.name = name))
  },
}

/**
 * popup是否打开过
 */
function isPopupExist(popups: any[], name: string) {
  const result = popups.filter(item => {
    return item.name === name
  })
  return result.length > 0
}
