import { useState } from 'react'
import { Errors, Touched, State, ModelType, IModel, Handlers, Actions, Result } from './types'
import { HandlerBuilder } from './HandlerBuilder'
import { ActionBuilder } from './ActionBuilder'
import { ToolBuilder } from './ToolBuilder'

/**
 * useForm hooks
 * @generic T Model Type
 * @param Model
 */
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
  const toolBuilder = new ToolBuilder(handlers, handlerBuilder, state, actions)
  const result: Result<T> = {
    state,
    handlers,
    actions,
    handlerBuilder,
    name: toolBuilder.createName(),
    error: toolBuilder.createError(),
    help: toolBuilder.createHelp(),
  }
  return result
}
