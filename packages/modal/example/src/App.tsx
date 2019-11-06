import React from 'react'

import { Modals, ModalConfig, modalStore } from './src'

import 'antd/dist/antd.css'

const About = () => (
  <span>
    about
    <button onClick={() => modalStore.close('about')}>close</button>
  </span>
)

About.modalProps = {
  title: 'haha',
}

const config: ModalConfig = [
  {
    name: 'about',
    component: About,
  },
]

export default () => (
  <div>
    <Modals config={config} />
    <span>Hi, Pea</span>
    <button onClick={() => modalStore.open('about', { foo: 'bar' })}>open</button>
  </div>
)
