import React, { FunctionComponent, useState, useEffect, useRef, CSSProperties } from 'react'

interface Props {
  visible: boolean
}

const overlay: CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0, 0.6)',
  display: 'none',
}

const content: CSSProperties = {
  width: '520px',
  margin: '40px auto',
  background: '#fff',
  overflow: 'auto',
  padding: '20px',
}

export const DefaultModalContainer: FunctionComponent<Props> = ({ visible, children }) => {
  const ref = useRef({} as HTMLDivElement)
  const toggle = () => {
    ref.current.style.display = visible ? 'block' : 'none'
  }

  useEffect(toggle, [])

  const [prevStatus, setStatus] = useState(visible)
  if (visible !== prevStatus) {
    setStatus(visible)
    toggle()
  }

  return (
    <div className="pea-modal" ref={ref} style={overlay}>
      <div className="pea-modal-content" style={content}>
        {children}
      </div>
    </div>
  )
}

DefaultModalContainer.defaultProps = {
  visible: false,
}
