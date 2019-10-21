import { FocusEvent } from 'react'
import produce, { original } from 'immer'
import get from 'lodash.get'
import set from 'lodash.set'
import isEqual from 'react-fast-compare'

import { FieldElement, State, Errors, Actions, Methods } from './types'
import { Validator } from './Validator'
import { checkValid } from './utils/checkValid'
import { touchAll } from './utils/touchAll'
import { isTouched } from './utils/isTouched'

export class HandlerBuilder<T> {
  constructor(
    private state: State<T>,
    private actions: Actions<T>,
    private setState: any, // TODO: handle any
    private methods: Methods<T>,
    private validator: Validator<T>,
  ) {}

  private updateBeforeSubmit(errors: Errors<T>) {
    const { state, methods, actions, setState } = this
    // update state
    const nextState = produce<State<T>, State<T>>(state, draft => {
      state.errors = errors
      const isValid = checkValid(draft.errors)
      draft.valid = isValid
      draft.touched = touchAll(state.values)
      draft.submitCount += 1
      draft.submitting = true
      draft.dirty = true

      if (!isValid && methods.onError) {
        methods.onError(original<any>(draft.errors), { state, actions })
      }
      if (isValid && methods.onSubmit) {
        methods.onSubmit(draft.values, { state, actions })
      }
    })
    setState({ ...nextState })
  }

  private getValue(value: any, type: string, checked: boolean, name: string): any {
    const { state } = this

    if (/number|range/.test(type)) {
      const parsed = parseFloat(value)
      return isNaN(parsed) ? '' : parsed
    }

    if (/checkbox/.test(type)) {
      const checkedValues = get(state.values, name)
      if (checked) {
        return [...checkedValues, value]
      }
      return checkedValues.filter((item: any) => item !== value)
    }
    return value
  }

  createSubmitHandler = () => {
    return async (e?: any) => {
      if (e && e.preventDefault) e.preventDefault()
      const errors = await this.validator.validateForm()
      this.updateBeforeSubmit(errors)
    }
  }

  createBlurHandler = (name?: string) => {
    const { state, setState } = this

    return async (e: FocusEvent<FieldElement>) => {
      let fieldName: string
      if (name) {
        fieldName = name
      } else {
        if (e.persist) e.persist()

        // hack for some custom onChange, eg: Antd Select
        const node = typeof e === 'object' ? e.target : ({} as any)
        const { name } = node
        fieldName = name
      }

      const errors = await this.validator.validateForm()
      const nextState = produce<State<T>, State<T>>(state, draft => {
        draft.touched[fieldName] = true
        draft.errors = errors
        draft.valid = checkValid(draft.errors)
      })
      setState({ ...nextState })
    }
  }

  createChangeHandler = (name?: string) => {
    const { state, setState } = this
    return async (e?: any) => {
      let fieldName: string
      let value: any

      if (name) {
        fieldName = name
        value = e
      } else {
        if (e && e.persist) e.persist()

        // hack for some custom onChange, eg: Antd Select
        const node = typeof e === 'object' ? e.target : {}
        const { value: nodeValue, name, type, checked } = node
        fieldName = name

        value = this.getValue(nodeValue, type, checked, name)
      }

      // setValues first，do not block ui
      const newState = produce<State<T>, State<T>>(state, draft => {
        set(draft.values as any, fieldName, value)
      })
      setState({ ...newState })

      // validate only touched
      if (!isTouched(state.touched, fieldName)) return

      // setErrors
      const errors = await this.validator.validateForm()

      if (isEqual(errors, state.errors)) return

      const nextState = produce<State<T>, State<T>>(state, draft => {
        // check from is valid
        draft.errors = errors
        draft.valid = checkValid(draft.errors)
      })
      setState({ ...nextState })
    }
  }
}
