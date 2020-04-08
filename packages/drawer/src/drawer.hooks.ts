import { useStore } from 'stook'
import { IDrawers } from './typings'
import { PEA_DRAWER } from './constant'

export function useDawers() {
  const [drawers, setDrawers] = useStore<IDrawers>(PEA_DRAWER, {})
  return {
    drawers,
    setDrawers,
  }
}

export function useDrawer<T>(name: string) {
  const { drawers } = useDawers()
  return {
    data: drawers[name].data as T,
    visible: drawers[name].visible,
    name: drawers[name].name,
  }
}
