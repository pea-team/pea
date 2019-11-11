
import React from 'react'
import { Popup, popupStore } from '../src'

import 'antd/dist/antd.css'

const About = () => (
  <span>
    about
    <button onClick={() => popupStore.close('DELETE_PROJECT')}>close</button>
  </span>
)

About.drawerProps = {}

export default () => (
  <div style={{ margin: '200px' }}>
    <div>Hi, Pea</div>

    <Popup content={<About></About>} name="DELETE_PROJECT" placement="left" title="删除项目">
      <button onClick={() => popupStore.open('about')}>open</button>
    </Popup>
  </div>
)
