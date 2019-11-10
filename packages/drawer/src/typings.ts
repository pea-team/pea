export interface DrawerConfigItem {
  name: string
  component: any
}

export type DrawerConfig = DrawerConfigItem[]

export interface IDrawers {
  [DrawerName: string]: DrawerInstnce
}


export interface DrawerInstnce {
  name: string
  data: any
  visible: boolean
}