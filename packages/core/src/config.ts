import { ComponentType } from 'react'

export interface Config {
  root: string
  // host: string
  app?: ComponentType<any>
}

export const config: Config = {} as Config
