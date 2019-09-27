import React from 'react'
// import { Modal } from 'antd'
import { Modals, ModalConfig, modalStore } from '../src'

import 'antd/dist/antd.css'

// modalStore.setModalContainer(Modal)

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
    <span>Hi, Dahlia</span>
    <button onClick={() => modalStore.open('about')}>open</button>
  </div>
)
