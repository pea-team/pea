export interface DrawerConfigItem {
  name: string
  component: any
}

export type DrawerConfig = DrawerConfigItem[]

export interface IDrawers {
  [DrawerName: string]: DrawerInstnce
}

export interface DrawerInstnce<T = any> {
  name: string
  data: T
  visible: boolean
}
