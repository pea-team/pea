import { createStore } from '@peajs/store'

export const popupStore = createStore({
  popups: [] as any[],

  open(name: string) {
    if (isPopupExist(popupStore.popups, name)) {
      popupStore.popups = getNewPopups(popupStore.popups, name, true)
      return
    }
    popupStore.popups = [...popupStore.popups, { name, data: {}, isOpen: true }]
  },

  close(name: string) {
    popupStore.popups = getNewPopups(popupStore.popups, name, false)
  },

  closeAll() {
    popupStore.popups = closeAll(popupStore.popups)
  },

  getPopup(name: string) {
    return popupStore.popups.find(item => item.name === name)
  },
})

/**
 * popup是否打开过
 */
function isPopupExist(popups: any[], name: string) {
  const result = popups.filter(item => {
    return item.name === name
  })
  return result.length > 0
}

function getNewPopups(popups: any[], name: string, isOpen: boolean) {
  return popups.map(item => {
    if (item.name === name) item.isOpen = isOpen
    return item
  })
}

function closeAll(popups: any[]) {
  return popups.map(item => {
    item.isOpen = false
    return item
  })
}
