import { createStore } from '@peajs/store'

interface DrawerInstnce {
  name: string
  data: any
  visible: boolean
}

interface Drawers {
  [DrawerName: string]: DrawerInstnce
}

export const drawerStore = createStore({
  drawers: {} as Drawers,
  open(name: string, data?: any) {
    drawerStore.drawers[name] = {
      name,
      data,
      visible: true,
    }
  },

  close(name: string) {
    drawerStore.drawers[name].visible = false
  },

  getDrawer(name: string) {
    return drawerStore.drawers[name]
  },
})
