import { ComponentType } from 'react'
import { Routes } from '@peajs/router'
import { ModalConfig } from '@peajs/modal'
import { DrawerConfig } from '@peajs/drawer'
import { RestConfig } from '@peajs/rest'
import { GraphqlConfig } from '@peajs/graphql'

export interface Config {
  routes: Routes
  modals: ModalConfig
  drawers: DrawerConfig
  graphql?: GraphqlConfig
  rest?: RestConfig
  root: string
  host: string
  app?: ComponentType<any>
}

export const config: Config = {} as Config
