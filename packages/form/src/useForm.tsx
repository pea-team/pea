import { useState, useRef } from 'react'
import deepmerge from 'deepmerge'
import { State, ModelType, Handlers, Actions, Result, Methods } from './types'
import { HandlerBuilder } from './HandlerBuilder'
import { ActionBuilder } from './ActionBuilder'
import { ToolBuilder } from './ToolBuilder'
import { Validator } from './Validator'
import { useIsMounted } from './utils/useIsMounted'

/**
 * useForm hooks
 * @generic T Model Type
 * @param Model
 */
export function useForm<T>(Model: ModelType<T>, methods: Methods<T> = {}) {
  const instance = new Model()
  const initialValue = useRef<State<T>>({
    values: instance,
    touched: {},
    errors: {},
    visible: {},
    dirty: false,
    valid: true,
    submitCount: 0,
    submitting: false,
  })
  const isMounted = useIsMounted()

  if (!isMounted) {
    initialValue.current.values = !methods.initValues
      ? instance
      : deepmerge<T>(instance, methods.initValues(instance) || {})
  }

  const [state, setState] = useState(initialValue.current)
  const actionBuilder = new ActionBuilder(state, setState, initialValue.current)

  const actions = {
    setTouched: actionBuilder.setTouched,
    setValues: actionBuilder.setValues,
    setErrors: actionBuilder.setErrros,
    setVisible: actionBuilder.setVisible,
    setSubmitting: actionBuilder.setSubmitting,
    resetForm: actionBuilder.resetForm,
    setState,
  } as Actions<T>

  const validator = new Validator(Model, state, actions, methods)
  const handlerBuilder = new HandlerBuilder(state, actions, setState, methods, validator)
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
