import { useState } from 'react'
import produce from 'immer'
import get from 'lodash.get'

import { Errors, Touched, State, ModelType, IModel, FieldProps } from './types'
import { HandlerBuilder } from './utils/HandlerBuilder'
import { createField } from './utils/createField'

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
  const action = {
    handleBlur: handler.createBlurHandler(),
    handleChange: handler.createChangeHandler(),
    setSubmitting,
    resetForm,
    submitForm: submitHandler,
    handleSubmit: submitHandler,
  }
  const Field = createField<T>(handler, state)

  return { state, action, name, error, Field }

  /////////////////////////////////////
  // functions
  /////////////////////////////////////
  function name(fieldName: string, { onBlur } = { onBlur: true }) {
    const props: FieldProps = {
      name: fieldName,
      value: get(state.values, fieldName),
      onChange: action.handleChange,
    }
    if (onBlur) props.onBlur = action.handleBlur

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
