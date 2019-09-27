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
  ModalContainer: null,
  setModalContainer(cmp: any) {
    modalStore.ModalContainer = cmp
  },
  open(name: string, data?: any) {
    modalStore.modals[name] = {
      name,
      data,
      visible: true,
    }
  },

  close(name: string) {
    modalStore.modals[name].visible = false
  },

  getModal(name: string) {
    return modalStore.modals[name]
  },
})
