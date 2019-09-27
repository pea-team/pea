import React, { useState } from 'react'
import DefaultModalContainer from '../src/DefaultModalContainer'

export default () => {
  const [visible, setVisible] = useState(false)
  return (
    <div>
      <span>Hi, Dahlia</span>
      <DefaultModalContainer visible={visible}>
        hello
        <button onClick={() => setVisible(false)}>close</button>
      </DefaultModalContainer>
      <button onClick={() => setVisible(true)}>open</button>
    </div>
  )
}
