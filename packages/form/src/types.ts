import React, { ReactElement, FormEvent, ChangeEvent, FocusEvent } from 'react'

export type FieldElement =
  | HTMLInputElement
  | HTMLTextAreaElement
  | HTMLSelectElement

export type Errors<V> = {
  [K in keyof V]?: V[K] extends object ? Errors<V[K]> : string
}

export type Touched<V> = {
  [K in keyof V]?: V[K] extends object ? Touched<V[K]> : boolean
}

export type Optional<V> = {
  [K in keyof V]?: V[K] extends object ? Optional<V[K]> : any
}

type ValidatorFn<V> = (values: V) => any
export type Validate<V> = (values: V) => any
export type Validator<V> =
  | { [P in keyof V]?: ValidatorFn<V> | any[] }
  | {
      [key: string]: ValidatorFn<V> | any[]
    }

export interface Store<V> {
  initialValues: V
  values: V
  errors: Errors<V>
  touched: Touched<V>
  submitting: boolean
  validating: boolean
  dirty: boolean
  valid: boolean
  validateOnChange: boolean
  validateOnBlur: boolean
  submitCount: number
  handleSubmit: (e: FormEvent<HTMLFormElement>) => any
  handleChange: (e: ChangeEvent<FieldElement>) => any
  handleBlur: (e: FocusEvent<FieldElement>) => any
  setValue: (name: string, value: any) => void
  setValues: (values: Optional<V>) => void
  setError: (name: string, errors: any) => void
  setErrors: (errors: Errors<V>) => void
  setTouched: (touched: Touched<V>) => void
  setTouchedByName: (name: string, value: boolean) => void
  setValid: (value: boolean) => void
  resetForm: () => void
  submitForm: () => any
  setSubmitCount: (count: number) => void
  setSubmitting: (submitting: boolean) => void
}

export interface FieldProps {
  name: string
  children?: ReactElement
  component?: React.ComponentType
  label?: any // TODO:
}

export interface ErrorMessageProps<V> {
  name: keyof V & string
  className?: string
  component?: string | React.ComponentType
  children?: (error: string) => React.ReactNode
  [key: string]: any
}

export interface Options<V> {
  initialValues?: V
  onSubmit?: (values: V, store: Store<V>) => any
  onError?: (errors: Errors<V>, store: Store<V>) => any
  onReset?: () => any
  validate?: Validate<V>
  validator?: Validator<V>
}
