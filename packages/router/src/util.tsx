import React, { useEffect } from 'react'
import Path from 'path-parser'
import { Page, Pages } from './typings'

interface Route {
  path?: string
  component?: any
  children?: Routes
}
type Routes = Route[]

export function useMount(mount: any): void {
  useEffect(mount, [])
}

export function useUnmount(unmount: any) {
  useEffect(
    () => () => {
      if (unmount) unmount()
    },
    [],
  )
}

export function pushState(url: string): void {
  history.pushState(null, '', url)
}

export function replaceState(url: string): void {
  history.replaceState(null, '', url)
}

export function matchPath(
  pagePath: string,
  clientPath: string,
): object | null | boolean {
  try {
    const parser = new Path(pagePath)
    return parser.test(clientPath)
  } catch (e) {
    return false
  }
}

// TODO: need refactor
function matchPage(page: Page, paths: string[]): object | null | boolean {
  const matchHome = getPath() === '/' && page.path === getPath()
  if (matchHome) return true

  const clientPath = getPath() + '/'
  const { path, parentPath, fullPath } = page
  try {
    if (!paths.length || !parentPath) {
      // return new Path(fullPath).partialTest(clientPath)
      return new Path(fullPath).test(clientPath)
    }
    if (path === '/') {
      const fullPaths = paths
        .map(i => parentPath + i)
        .filter(i => {
          // return new Path(i).partialTest(clientPath)
          return new Path(i).test(clientPath)
        })
      if (fullPaths.length > 1) {
        return false
      }
      // return new Path(fullPath).partialTest(clientPath)
      return new Path(fullPath).test(clientPath)
    }
    // return new Path(fullPath).partialTest(clientPath)
    return new Path(fullPath).test(clientPath)
  } catch (e) {
    return false
  }
}

export function getPath(): string {
  const { pathname } = window.location
  return pathname
}

export function getFullPath(): string {
  const { pathname, search, hash } = window.location
  return pathname + search + hash
}

function trimSlash(str: string) {
  return str.replace(/^\//, '').replace(/\/$/, '')
}

export function setFullPath(pages: Routes, parentPath = ''): Pages {
  if (!pages) return []
  return pages.map(page => {
    const { children, path = '' } = page
    let fullPath = [trimSlash(parentPath), trimSlash(path)].join('/')
    fullPath = fullPath.substr(0, 1) === '/' ? fullPath : '/' + fullPath
    if (children && children.length) {
      return {
        ...page,
        fullPath,
        children: setFullPath(children, fullPath),
        root: !parentPath,
        parentPath,
        default: false,
      }
    }

    return {
      ...page,
      fullPath,
      root: !parentPath,
      default: path === '/',
      parentPath,
    }
  })
}

/**
 * find the matched root page
 * @param pages
 * @param path
 */
export function findRooPage(pages: Pages, path: string): Page | null {
  const finder: any = (page: Page) => {
    if (page.children && page.children.length) {
      return page.children.find((subPage: Page) => finder(subPage))
    } else {
      return matchPath(page.fullPath, path)
    }
  }

  const finded = pages.find(page => finder(page))
  if (!finded) return null

  return finded
}

export function getParams(pages: Pages, path: string) {
  let params = {}

  function find(pages: Pages) {
    for (const item of pages) {
      const result = new Path(item.fullPath).partialTest(path)
      if (result) {
        params = { ...params, ...result }
      }

      if (item.children && item.children.length) {
        find(item.children)
      }
    }
  }
  find(pages)

  return params
}

export function findDefaultPage(pages: Pages): Page | undefined {
  return pages.find(item => item.path === '**')
}

export function createPage(pages: Pages, paths: string[] = []): any {
  return pages.map((item, index) => {
    const match = matchPage(item, paths)
    const PG = item.component

    if (!item.children || !item.children.length) {
      return !!match ? <PG key={index} /> : null
    }

    const currentPaths = item.children.reduce(
      (result, cur) => [...result, cur.path],
      [],
    )

    return <PG key={index}>{createPage(item.children, currentPaths)}</PG>
  })
}
