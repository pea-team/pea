import React from 'react'
import { i18n } from '@peajs/i18n'

export default () => (
  <div>
    <span>{i18n.appName}</span>
    <nav>
      <ul>
        <li>{i18n.nav.home}</li>
        <li>{i18n.nav.about}</li>
        <li>{i18n.nav.contact}</li>
      </ul>
    </nav>
  </div>
)
