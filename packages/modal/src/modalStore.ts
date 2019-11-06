import { createStore } from '@peajs/store'

interface ModalInstnce {
  name: string
  data: any
  visible: boolean
}

interface Modals {
  [modalName: string]: ModalInstnce
}

export const modalStore = createStore({
  modals: {} as Modals,
  open(name: string, data?: any) {
    if (!modalStore.modals[name]) {
      modalStore.modals[name] = { name } as ModalInstnce
    }

    modalStore.modals[name].data = data
    modalStore.modals[name].visible = true
  },

  close(name: string) {
    modalStore.modals[name].visible = false
  },
})
