import { useState } from 'react'
import get from 'lodash.get'
import {
  Errors,
  Touched,
  State,
  ModelType,
  IModel,
  NameProps,
  Handlers,
  Actions,
  NameOptions,
  Result,
} from './types'
import { HandlerBuilder } from './HandlerBuilder'
import { ActionBuilder } from './ActionBuilder'
import { ComponentBuilder } from './ComponentBuilder'

/**
 * useForm hooks
 * @generic T Model Type
 * @generic F Field Type
 * @param Model
 */
export function useForm<T, F>(Model: ModelType<T>) {
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
  const componentBuilder = new ComponentBuilder<T>(handlerBuilder, state, handlers, actions)
  const result: Result<F, T> = {
    state,
    handlers,
    actions,
    name,
    error,
    Field: componentBuilder.createField<F>(),
    Form: componentBuilder.createForm(),
    ErrorMessage: componentBuilder.createErrorMessage(),
  }
  return result

  /**
   * shortcut to bind form field with name，onChange, onBlur
   * @param name name of field
   * @param options onBlur options
   */
  function name(name: string, options: NameOptions = { onBlur: true }) {
    const props: NameProps = {
      name: name,
      value: get(state.values, name),
      onChange: handlers.handleChange,
    }
    if (options.onBlur) props.onBlur = handlers.handleBlur
    return props
  }

  /**
   * shortcut to get error message
   * @param name name of field
   */
  function error(name: string): string | null {
    const { errors, touched } = state
    if (!touched[name] && !errors[name]) return null
    return errors[name] ? errors[name] : null
  }
}
