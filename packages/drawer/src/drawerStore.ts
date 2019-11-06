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
    if (!drawerStore.drawers[name]) {
      drawerStore.drawers[name] = { name } as DrawerInstnce
    }

    drawerStore.drawers[name].data = data
    drawerStore.drawers[name].visible = true
  },

  close(name: string) {
    drawerStore.drawers[name].visible = false
  },
})
