import { useState } from 'react'
import { Errors, Touched, State, ModelType, Handlers, Actions, Result, Methods } from './types'
import { HandlerBuilder } from './HandlerBuilder'
import { ActionBuilder } from './ActionBuilder'
import { ToolBuilder } from './ToolBuilder'

/**
 * useForm hooks
 * @generic T Model Type
 * @param Model
 */
export function useForm<T>(Model: ModelType<T>, methods: Methods<T> = {}) {
  const instance = new Model()

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
  const actionBuilder = new ActionBuilder(state, setState, initialValue)

  const actions = {
    setTouched: actionBuilder.setTouched,
    setValues: actionBuilder.setValues,
    setErrors: actionBuilder.setErrros,
    setSubmitting: actionBuilder.setSubmitting,
    resetForm: actionBuilder.resetForm,
    setState,
  } as Actions<T>

  const handlerBuilder = new HandlerBuilder(state, actions, setState, methods)
  const submitHandler = handlerBuilder.createSubmitHandler()

  const handlers: Handlers = {
    handleBlur: handlerBuilder.createBlurHandler(),
    handleChange: handlerBuilder.createChangeHandler(),
    handleSubmit: submitHandler,
  }

  const toolBuilder = new ToolBuilder(handlers, handlerBuilder, state, actions)

  actions.submitForm = submitHandler // attach submitHandler to action

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
