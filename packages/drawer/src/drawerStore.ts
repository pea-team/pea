import { mutate, getState } from 'stook'
import { IDrawers, DrawerInstnce } from './typings'
import { PEA_DRAWER } from './constant'

export const drawerStore = {
  open(name: string, data?: any) {
    mutate(PEA_DRAWER, (drawers: IDrawers) => {
      if (!drawers[name]) {
        drawers[name] = { name } as DrawerInstnce
      }

      drawers[name].data = data
      drawers[name].visible = true
    })
  },

  close(name: string) {
    mutate(PEA_DRAWER, (drawers: IDrawers) => {
      if (drawers[name]) {
        drawers[name].visible = false
      }
    })
  },

  get<T>(name: string): DrawerInstnce<T> {
    const store: any = getState(PEA_DRAWER)
    return store[name]
  },
}
