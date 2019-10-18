import { useState } from 'react'
import get from 'lodash.get'

import { Errors, Touched, State, ModelType, IModel, FieldProps, Handlers, Actions } from './types'
import { HandlerBuilder } from './HandlerBuilder'
import { ActionBuilder } from './ActionBuilder'
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
  const handlerBuilder = new HandlerBuilder(state, setState, methods)
  const actionBuilder = new ActionBuilder(state, setState, initialValue)
  const submitHandler = handlerBuilder.createSubmitHandler()
  const handlers: Handlers = {
    handleBlur: handlerBuilder.createBlurHandler(),
    handleChange: handlerBuilder.createChangeHandler(),
    handleSubmit: submitHandler,
  }
  const actions: Actions<T> = {
    setTouched: actionBuilder.setTouched,
    setValues: actionBuilder.setValues,
    setErrors: actionBuilder.setErrros,
    setSubmitting: actionBuilder.setSubmitting,
    resetForm: actionBuilder.resetForm,
    submitForm: submitHandler,
    setState,
  }
  const Field = createField<T>(handlerBuilder, state)

  return {
    state,
    handlers,
    actions,
    name,
    error,
    Field,
  }

  /**
   * shortcut to bind form field with name，onChange, onBlur
   * @param name name of field
   * @param options onBlur options
   */
  function name(name: string, { onBlur } = { onBlur: true }) {
    const props: FieldProps = {
      name: name,
      value: get(state.values, name),
      onChange: handlers.handleChange,
    }
    if (onBlur) props.onBlur = handlers.handleBlur
    return props
  }

  /**
   * shortcut to get error message
   * @param name name of field
   */
  function error(name: string) {
    const { errors, touched } = state
    if (!touched[name] && !errors[name]) return null
    return errors[name] ? errors[name] : null
  }
}
