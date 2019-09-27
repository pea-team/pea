import React, { Fragment } from 'react'
import { render } from 'react-dom'
import { config as configRest } from '@peajs/rest'
import { config as configGraphql } from '@peajs/graphql'
import { Router } from '@peajs/router'
import { Modals } from '@peajs/modal'
import { Drawers } from '@peajs/drawer'
import gql from 'gql-tag'

import { Config } from './config'

function bootstrap(options: Config) {
  const { routes, modals, drawers, graphql, rest, root, app } = options
  if (rest) configRest(rest)
  if (graphql) configGraphql(graphql)

  const Wrapper = app ? app : Fragment

  render(
    <Wrapper>
      <Router routes={routes} />
      <Modals config={modals} />
      <Drawers config={drawers} />
    </Wrapper>,
    document.querySelector(root),
  )
}

const Dahlia = {
  bootstrap,
}

export { bootstrap, gql }
export * from './config'
export default Dahlia
