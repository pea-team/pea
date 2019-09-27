import React, { FormEvent, Fragment, createElement } from 'react'
import { createStore } from '@peajs/store'
import { check } from 'checkok'
import get from 'lodash.get'
import set from 'lodash.set'
import isArray from 'util-is-array'
import {
  FieldProps,
  Touched,
  Errors,
  Store,
  Options,
  Validate,
  Validator,
  ErrorMessageProps,
} from './types'
import { val } from './val'

export function createForm<V>(options: Options<V>) {
  const {
    initialValues = {} as V,
    validate,
    validator,
    onSubmit,
    onError,
    onReset,
  } = options

  checkValidateOptions<V>(validate, validator)

  const store = createStore({
    initialValues: JSON.parse(JSON.stringify(initialValues)),
    values: initialValues,
    touched: {} as Touched<V>,
    errors: {} as Errors<V>,
    dirty: false,
    valid: true,
    submitCount: 0,
    submitting: false,
    setValue(name, value) {
      set(store.values as any, name, value)
    },
    setValues(values) {
      store.values = {
        ...store.values,
        ...values,
      }
    },
    setError(name, error) {
      if (!error) {
        delete store.errors[name]
      } else {
        store.errors[name] = error
      }
    },
    setErrors(errors) {
      store.errors = errors
    },
    setTouched(touched: Touched<V>) {
      store.touched = touched
    },
    setTouchedByName(name, value) {
      store.touched[name] = value
    },
    setValid(valid) {
      store.valid = valid
    },
    setSubmitCount(count: number) {
      store.submitCount += count
    },
    resetForm() {
      // TODO: handle clone
      store.values = JSON.parse(JSON.stringify(store.initialValues))
      if (onReset && typeof onReset === 'function') {
        onReset()
      }
    },
    setSubmitting(submitting) {
      store.submitting = submitting
    },
    submitForm() {
      submit()
    },
    handleSubmit(e: Event | FormEvent<HTMLFormElement>) {
      if (e && e.preventDefault) e.preventDefault()
      submit()
    },
  } as Store<V>)

  const submit = () => {
    store.setSubmitCount(1)
    store.setSubmitting(true)
    if (validate) {
      const nextErrors = validate(store.values)
      if (nextErrors) store.setErrors(nextErrors)
    }
    if (validator) {
      const nextErrors = runValidator(store.values)
      if (nextErrors) store.setErrors(nextErrors)
    }
    const isValid = checkValid(store.errors)
    store.setValid(isValid)
    if (!isValid && onError) {
      onError(store.errors, store)
    }
    if (isValid && onSubmit) {
      onSubmit(store.values, store)
    }
  }

  const handleChange = (...params: any[]) => {
    const [name, e] = params

    // for custom element
    if (typeof e !== 'object') {
      store.setValue(name, e)
      return
    }

    if (e.persist) e.persist()
    const $node = e.target
    const { type, value } = $node

    // TODO: check improve
    if (type === 'checkbox') {
      const checkedValues = get(store.values, name)
      const checked = val($node)
      let newCheckedValues: any // TODO:
      if (checked) {
        newCheckedValues = [...checkedValues, value]
      } else {
        newCheckedValues = checkedValues.filter((item: any) => item !== value)
      }
      store.setValue(name, newCheckedValues)
      return
    } else {
      store.setValue(name, val($node))
    }

    if (isTouched(name)) {
      runValidate()
      if (validator) validateField(name)
      store.setValid(checkValid(store.errors))
    }
  }

  const handleBlur = (name: string) => {
    store.setTouchedByName(name, true)
    // if validate
    runValidate()
    if (validator) validateField(name)
    store.setValid(checkValid(store.errors))
  }

  function checkValidateOptions<V>(
    validate: Validate<V> | undefined,
    validator: Validator<V> | undefined,
  ) {
    if (validate && validator) {
      throw new Error(
        'Can only configure one between "validate" or "validator"',
      )
    }
  }

  function isTouched(name: string): boolean {
    if (store.touched[name]) return !!store.touched[name]
    return false
  }

  function validateField(name: string) {
    const fieldValidator: any = get(validator, name)
    let error: string | null = null
    let result: any
    if (!fieldValidator) return
    if (typeof fieldValidator === 'function') {
      const validatorFns = fieldValidator(store.values)
      result = check(store.values[name]).pipe(...validatorFns)
    }

    if (isArray(fieldValidator)) {
      result = check(store.values[name]).pipe(...fieldValidator)
    }

    if (!result.ok && result.message) {
      error = result.message
    }

    store.setError(name, error)
  }

  function runValidate() {
    if (validate) {
      const nextErrors = validate(store.values)
      if (nextErrors) store.setErrors(nextErrors)
    }
  }

  function checkValid(errors: any = {}): boolean {
    let errorString = ''
    function getErrrorString(errors: any = {}) {
      Object.keys(errors).forEach(key => {
        if (typeof errors[key] === 'object') {
          getErrrorString(errors[key])
        } else {
          errorString += errors[key]
        }
      })
    }
    getErrrorString(errors)
    return !errorString.length
  }

  function runValidator(values: V) {
    const errors = {} as Errors<V>
    if (!validator) return errors
    return Object.keys(validator).reduce((result, key) => {
      // TODO: handle any
      const validateFn: any = validator[key]

      if (validateFn && typeof validateFn === 'function') {
        const validateResult = validateFn(values) || {}
        if (!validateResult.ok && validateResult.message) {
          result[key] = validateResult.message
        }
      }

      if (isArray(validateFn)) {
        // TODO: handle any
        const checkResult: any = check(values[key]).pipe(...validateFn)

        if (!checkResult.ok && checkResult.message) {
          result[key] = checkResult.message
        }
      }

      return result
    }, errors)
  }

  const Field: React.FC<FieldProps> = props => {
    const { name, children, component } = props

    const { values } = store
    // TODO:: handle any
    const field: any = {
      name,
      onChange: (...e: any[]) => handleChange(name, ...e),
      onBlur: () => handleBlur(name),
    }

    if (children && typeof children !== 'function') {
      const { type, value } = children.props

      if (type === 'radio') {
        field.checked = value === get(store.values, name)
        // field.value = value
      } else if (type === 'checkbox') {
        field.checked = get(store.values, name).includes(value)
        // field.value = value
      } else {
        field.value = values[name]
      }

      return React.cloneElement(children, { ...field })
    }

    if (component) {
      field.value = values[name]
      const Item: any = component
      return <Item field={field} />
    }
    return null
  }

  /**
   * ErrorMessage Component
   * @param props
   */
  const ErrorMessage: React.SFC<ErrorMessageProps<V>> = props => {
    const { name, children, component = 'div', ...rest } = props
    const { errors, touched } = store
    if (!touched[name] && !errors[name]) return null
    // TODO: handle any
    const error: any = errors[name]

    if (children && typeof children === 'function') {
      return <Fragment>{children(error)}</Fragment>
    }

    return <Fragment>{createElement(component, rest as any, error)}</Fragment>
  }

  ErrorMessage.defaultProps = {
    className: 'pea-form-field-error',
    component: 'div',
  }

  const Form: React.FC = props => {
    return <form {...props} onSubmit={store.handleSubmit} />
  }

  return {
    Form,
    Field,
    store,
    ErrorMessage,
  }
}
