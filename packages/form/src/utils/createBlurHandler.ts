import produce from 'immer'

import { validateField } from './validateField'
import { checkValid } from './checkValid'
import { FocusEvent } from 'react'
import { FieldElement, State } from '../types'

export function createBlurHandler<T>(state: State<T>, setState: any) {
  return function handleChange(e: FocusEvent<FieldElement>) {
    if (typeof e !== 'object') return
    if (e.persist) e.persist()
    const { name } = e.target
    const errMsg = validateField(state.values, name)
    const nextState = produce<State<T>, State<T>>(state, draft => {
      draft.touched[name] = true

      if (errMsg) {
        draft.errors[name] = errMsg
      } else {
        delete draft.errors[name]
      }

      draft.valid = checkValid(draft.errors)
    })
    setState({ ...nextState })
  }
}
