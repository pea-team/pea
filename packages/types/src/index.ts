import { ComponentType } from 'react'
import { Configuration } from 'webpack'

export interface IPlugin {
  beforeCompile?: () => any
  updateWebpackConfig?: (config: Configuration, env?: string) => Configuration
  addImportCode?: () => any
  addBootstrapCode?: () => any
  addRenderCode?: () => any
}

export interface PeaConfig {
  title?: string
  appHtml?: string
  outputHtml?: string
  buildDir?: string
  plugins: IPlugin[]
}

export interface Config {
  root: string
  host: string
  app?: ComponentType<any>
}
