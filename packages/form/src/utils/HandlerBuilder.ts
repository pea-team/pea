import { FocusEvent, ChangeEvent } from 'react'
import produce, { original } from 'immer'
import get from 'lodash.get'

import { FieldElement, State, IModel, Errors } from '../types'
import { validateForm } from './validateForm'
import { checkValid } from './checkValid'
import { touchAll } from './touchAll'
import { isPromise } from './isPromise'
import { isTouched } from './isTouched'
import { validateField } from './validateField'
import { val } from './val'

export class HandlerBuilder<T> {
  constructor(
    private state: State<T>,
    private setState: any, // TODO: handle any
    private methods: IModel<T>,
  ) {}

  private updateAfterSubmit(errors: Errors<T>) {
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

  createSubmitHandler() {
    const { state, methods } = this
    return (e: any) => {
      if (e && e.preventDefault) e.preventDefault()
      let errors: Errors<T> = {}

      // class-validator validate
      const validateMetaErrors = validateForm(state.values)
      if (validateMetaErrors) {
        errors = { ...errors, ...validateMetaErrors }
      }

      // function validate
      if (methods.validate) {
        let validateFnErrors = methods.validate(state.values)
        // sync validate
        if (!isPromise(validateFnErrors)) {
          errors = { ...errors, ...validateFnErrors }
          this.updateAfterSubmit(errors)
          return
        }
        // async validate
        validateFnErrors
          .then((validateFnErrors: any) => {
            if (validateFnErrors) {
              errors = { ...errors, ...validateFnErrors }
            }
            this.updateAfterSubmit(errors)
          })
          .catch((e: any) => {
            console.log('run validate exception:', e)
          })
      }
    }
  }

  createBlurHandler() {
    const { state, setState } = this
    return (e: FocusEvent<FieldElement>) => {
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

  createChangeHandler(fieldName?: string) {
    const { state, setState } = this
    return (e: ChangeEvent<FieldElement> | any) => {
      if (typeof e !== 'object') return
      if (e.persist) e.persist()

      const $node = e.target
      const { value, type } = $node
      const name = fieldName || $node.name
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
}
