import React, { FC, useState } from 'react'
import { Link } from '@peajs/router'

import '../index.scss'

interface Item {
  type: string
  ui?: boolean
}
const routes: Item[] = [
  { type: '' },
  {
    type: 'nested-object',
  },
  {
    type: 'array',
  },
  {
    type: 'radio',
  },
  {
    type: 'checkbox',
  },
  {
    type: 'select',
  },
  {
    type: 'async-submit',
  },
  {
    type: 'reset-form',
  },
  {
    type: 'sync-validation',
  },
  {
    type: 'error-message',
  },
  {
    type: 'dynamic-array',
  },
  {
    type: 'custom-validator',
  },
  {
    type: 'async-validation',
  },
  {
    type: 'password-confirm',
  },
  {
    type: 'material-ui',
    ui: true,
  },
  {
    type: 'antd',
    ui: true,
  },
  {
    type: 'antd-validation',
    ui: true,
  },
  {
    type: 'antd-radio',
    ui: true,
  },
  {
    type: 'react-select',
    ui: true,
  },
]

const App: FC = ({ children }) => {
  const [title, setTitle] = useState(location.pathname.replace('/', ''))
  const item  = routes.find(i => i.type === title) as Item
  const [ui, setIsUI] = useState(item?!!item.ui: false)

  function clickItem(item: Item) {
    setTitle(item.type !== '' ? item.type : 'basic')
    setIsUI(!!item.ui)
  }
  return (
    <div>
      <div className="nav">
        {routes.map(item => (
          <span key={item.type} onClick={() => clickItem(item)}>
            <Link activeClassName="selected" to={`/${item.type}`}>
              {item.type !== '' ? item.type : 'basic'}
            </Link>
          </span>
        ))}
      </div>

      <div className={`card ${ui ? '' : 'no-ui'}`}>
        <h2>{title}</h2>
        {children}
      </div>
    </div>
  )
}

export default App
