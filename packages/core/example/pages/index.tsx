import React from 'react'
import { modalStore } from 'Pea/modal'

export default () => (
  <div>
    Hi, Pea!!!!
    <button onClick={() => modalStore.open('user')}>open</button>
  </div>
)
