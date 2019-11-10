import React from 'react'
import { Button } from 'antd'
import { Drawers, DrawerConfig, drawerStore } from './src'

import 'antd/dist/antd.css'

const About = () => {
  setTimeout(() => {
    const drawer = drawerStore.get('about')
    console.log('drawer:', drawer)
    // console.log('name:', drawer.name)
    // console.log('data:', drawer.data)
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
      <Button onClick={() => drawerStore.open('about', { foo: 'bar' })}>open</Button>
    </div>
  )
}

export default App
