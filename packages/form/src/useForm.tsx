import { useState, FormEvent } from 'react'
import produce, { original } from 'immer'

import { Errors, Touched, State, ModelType, IModel, FieldProps } from './types'
import { validateForm } from './utils/validateForm'
import { checkValid } from './utils/checkValid'
import { createChangeHandler } from './utils/createChangeHandler'
import { createBlurHandler } from './utils/createBlurHandler'
import { touchAll } from './utils/touchAll'

export function useForm<T>(Model: ModelType<T>) {
  const instance = new Model()
  const methods: IModel<T> = Object.getPrototypeOf(instance)
  const initialValue = {
    values: instance,
    touched: {} as Touched<T>,
    errors: {} as Errors<T>,
    dirty: false,
    valid: true,
    submitCount: 0,
    submitting: false,
  } as State<T>
  const [state, setState] = useState(initialValue)
  const result = {
    state: state,
    action: {
      handleBlur: createBlurHandler(state, setState),
      handleChange: createChangeHandler(state, setState),
      setSubmitting,
      resetForm,
      submitForm,
      handleSubmit,
    },
    name,
  }

  return result

  /////////////////////////////////////
  // functions
  /////////////////////////////////////


  function name(fieldName: string, { onBlur } = { onBlur: true }) {
    const props: FieldProps = {
      name: fieldName,
      value: result.state.values[fieldName],
      onChange: result.action.handleChange,
    }
    if (onBlur) props.onBlur = result.action.handleBlur

    return props
  }

  function submitForm() {
    setSubmitCount(1)
    setSubmitting(true)
    const nextErrors = validateForm(state.values)
    const nextState = produce<State<T>, State<T>>(state, draft => {
      if (nextErrors) state.errors = nextErrors

      const isValid = checkValid(draft.errors)
      draft.valid = isValid
      draft.touched = touchAll(state.values)

      if (!isValid && methods.onError) {
        methods.onError(original<any>(draft.errors))
      }
      if (isValid && methods.onSubmit) {
        methods.onSubmit(draft.values)
      }
    })
    setState({ ...nextState })
  }

  function resetForm() {
    setState(initialValue)
  }

  function setSubmitting(submitting: boolean) {
    const nextState = produce<State<T>, State<T>>(state, draft => {
      draft.submitting = submitting
    })
    setState({ ...nextState })
  }

  function setSubmitCount(count: number) {
    const nextState = produce<State<T>, State<T>>(state, draft => {
      draft.submitCount += count
    })
    setState({ ...nextState })
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    if (e && e.preventDefault) e.preventDefault()
    submitForm()
  }
}
