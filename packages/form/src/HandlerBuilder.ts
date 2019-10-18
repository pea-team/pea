import { FocusEvent, ChangeEvent } from 'react'
import produce, { original } from 'immer'
import get from 'lodash.get'
import set from 'lodash.set'

import { FieldElement, State, IModel, Errors } from './types'
import { validateForm } from './utils/validateForm'
import { checkValid } from './utils/checkValid'
import { touchAll } from './utils/touchAll'
import { isPromise } from './utils/isPromise'
import { isTouched } from './utils/isTouched'

export class HandlerBuilder<T> {
  constructor(
    private state: State<T>,
    private setState: any, // TODO: handle any
    private methods: IModel<T>,
  ) {}

  private updateBeforeSubmit(errors: Errors<T>) {
    const { state, methods, setState } = this
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
        methods.onError(original<any>(draft.errors))
      }
      if (isValid && methods.onSubmit) {
        methods.onSubmit(draft.values)
      }
    })
    setState({ ...nextState })
  }

  private runValidate(state: State<T>, methods: IModel<T>, cb: (errors: Errors<T>) => any) {
    const validateResult = validateForm(state, methods)

    if (isPromise(validateResult)) {
      ;(validateResult as Promise<Errors<T>>)
        .then(errors => {
          cb(errors)
        })
        .catch(e => {
          console.log(e)
        })
    } else {
      cb(validateResult as Errors<T>)
    }
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

  createSubmitHandler() {
    const { state, methods } = this

    return (e?: any) => {
      if (e && e.preventDefault) e.preventDefault()
      this.runValidate(state, methods, errors => {
        this.updateBeforeSubmit(errors)
      })
    }
  }

  createBlurHandler() {
    const { state, setState, methods } = this

    return (e: FocusEvent<FieldElement>) => {
      if (typeof e !== 'object') return
      if (e.persist) e.persist()

      const { name } = e.target

      this.runValidate(state, methods, errors => {
        const nextState = produce<State<T>, State<T>>(state, draft => {
          draft.touched[name] = true
          draft.errors = errors
          draft.valid = checkValid(draft.errors)
        })
        setState({ ...nextState })
      })
    }
  }

  createChangeHandler(fieldName?: string) {
    const { state, setState, methods } = this

    return (e: ChangeEvent<FieldElement> | any) => {
      if (typeof e !== 'object') return
      if (e.persist) e.persist()

      const { value, type, checked, name = 'fieldName' } = e.target

      this.runValidate(state, methods, errors => {
        const nextState = produce<State<T>, State<T>>(state, draft => {
          // check from is valid
          if (isTouched(state.touched, name)) {
            draft.errors = errors
            draft.valid = checkValid(draft.errors)
          }

          // set Value
          set(draft.values as any, name, this.getValue(value, type, checked, name))
        })
        setState({ ...nextState })
      })
    }
  }
}
