import { FocusEvent, ChangeEvent } from 'react'
import produce, { original } from 'immer'
import get from 'lodash.get'

import { FieldElement, State, IModel, Errors } from '../types'
import { validateForm } from './validateForm'
import { checkValid } from './checkValid'
import { touchAll } from './touchAll'
import { isPromise } from './isPromise'
import { isTouched } from './isTouched'
import { val } from './val'

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

  createSubmitHandler() {
    const { state, methods } = this

    return (e: any) => {
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

      const $node = e.target
      const { value, type } = $node
      const name = fieldName || $node.name

      this.runValidate(state, methods, errors => {
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
            console.log('value:', value);
            // filedValue = value
            filedValue = val($node)
          }

          // check from is valid
          if (isTouched(state.touched, name)) {
            draft.errors = errors
            draft.valid = checkValid(draft.errors)
          }
          console.log('filedValue:', filedValue)

          // set Value
          draft.values[name] = filedValue
        })
        setState({ ...nextState })
      })
    }
  }
}
