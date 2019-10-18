import { useState } from 'react'
import produce from 'immer'

import { Errors, Touched, State, ModelType, IModel, FieldProps } from './types'
import { HandlerBuilder } from './utils/HandlerBuilder'

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
  const handler = new HandlerBuilder(state, setState, methods)
  const submitHandler = handler.createSubmitHandler()

  const result = {
    state: state,
    action: {
      handleBlur: handler.createBlurHandler(),
      handleChange: handler.createChangeHandler(),
      setSubmitting,
      resetForm,
      submitForm: submitHandler,
      handleSubmit: submitHandler,
    },
    name,
    error,
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

  function error(name: string) {
    const { errors, touched } = state
    if (!touched[name] && !errors[name]) return null
    return errors[name] ? errors[name] : null
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
}
