export interface PopupConfigItem {
  name: string
  component: any
}

export type PopupConfig = PopupConfigItem[]

export interface PopupItem {
  name: string
  data: any
  isOpen: boolean
}

export type Popups = PopupItem[]
