import produce from 'immer'
import get from 'lodash.get'

import { validateField } from './validateField'
import { isTouched } from './isTouched'
import { checkValid } from './checkValid'
import { val } from './val'
import { ChangeEvent } from 'react'
import { FieldElement, State } from 'src/types'

export function createChangeHandler<T>(state: State<T>, setState: any) {
  return function handleChange(e: ChangeEvent<FieldElement> | any) {
    if (typeof e !== 'object') return
    if (e.persist) e.persist()

    const $node = e.target
    const { value, type, name } = $node
    const errMsg = validateField(state.values, name)

    const nextState = produce<State<T>, State<T>>(state, draft => {
      let filedValue: any

      if (type === 'checkbox') {
        const checkedValues = get(state.values, name)
        const checked = val($node)
        let newCheckedValues: any // TODO:
        if (checked) {
          newCheckedValues = [...checkedValues, value]
        } else {
          newCheckedValues = checkedValues.filter((item: any) => item !== value)
        }
        filedValue = newCheckedValues
      } else {
        filedValue = val($node)
      }

      // check from is valid
      if (isTouched(state.touched, name)) {
        if (errMsg) {
          draft.errors[name] = errMsg
        } else {
          draft.valid = checkValid({ ...state.errors })
          delete draft.errors[name]
        }

        draft.valid = checkValid(draft.errors)
      }

      // set Value
      draft.values[name] = filedValue
    })
    setState({ ...nextState })
  }
}
