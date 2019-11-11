import React, { FC } from 'react'

import { useRouter } from '../useRouter'
import { LINK_SELECTED_CLASSNAME } from '../constant'

interface Props {
  to: string
  replace?: boolean | undefined
  activeClassName?: string
  [key: string]: any
}

function getClassName(props: Props, currentPath: string): string {
  const { to, activeClassName, className } = props
  const isActive = currentPath === to

  const classes = []
  if (isActive) classes.push(activeClassName || LINK_SELECTED_CLASSNAME)
  if (props.className) classes.push(className)
  return classes.join(' ')
}

const Link: FC<Props> = props => {
  const {
    state: { currentPath },
  } = useRouter()
  const { to, replace, className, activeClassName, ...restProps } = props

  const { navigate: go } = useRouter()

  function clickLink(e: React.SyntheticEvent, to: string, replace: boolean): void {
    e.preventDefault()
    go(to, replace)
  }

  return (
    <a
      href={to}
      onClick={e => clickLink(e, to, !!replace)}
      className={getClassName(props, currentPath)}
      {...restProps}
    >
      {props.children}
    </a>
  )
}

export default Link
