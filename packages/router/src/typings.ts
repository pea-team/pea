export type Pages = Page[]
export interface Page {
  path?: string
  fullPath: string
  children?: any[]
  component?: any
  root: boolean
  default: boolean
  parentPath: string
}

export interface State {
  inited: boolean
  pages: Page[]
  defaultPage: Page
  params: {
    [key: string]: any
  }
  currentPage?: Page
  currentPath?: string
}

export type Routes = Route[]

export interface Route {
  path?: string
  pathMatch?: string
  component?: any
  redirectTo?: string
  children?: Routes
}

interface Ctx {
  from: string
  to: string
}

type Next = () => any

export type Interceptor = (ctx: Ctx, next: Next) => void
