import React from 'react'
import { Drawers, DrawerConfig, drawerStore } from './src'
import './App.css'

import 'antd/dist/antd.css'

const About = () => {
  setTimeout(() => {
    const modal = drawerStore.drawers['about']
    console.log('modal:', modal)
    console.log('name:', modal.name)
    console.log('data:', modal.data)
  }, 1002)
  return (
    <span>
      about
      <button onClick={() => drawerStore.close('about')}>close</button>
    </span>
  )
}

const config: DrawerConfig = [
  {
    name: 'about',
    component: About,
  },
]

const App: React.FC = () => {
  return (
    <div className="App">
      <Drawers config={config} />
      <span>Hi, Dahlia</span>
      <button onClick={() => drawerStore.open('about', { foo: 'bar' })}>open</button>
    </div>
  )
}

export default App
