import React from 'react'

export type FieldElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement

export type Errors<T> = {
  [K in keyof T]?: T[K] extends object ? Errors<T[K]> : string
}

export type Touched<T> = {
  [K in keyof T]?: T[K] extends object ? Touched<T[K]> : boolean
}

export interface IModel<T = any> {
  validate?: (values: T) => any
  onSubmit?: (values: T) => any
  onError?: (errors: Errors<T>) => any
  onReset?: () => any
}

export interface ModelType<T = any> {
  new (...args: any[]): T
}

export interface State<T> {
  values: T
  errors: Errors<T>
  touched: Touched<T>
  submitting: boolean
  dirty: boolean
  valid: boolean
  submitCount: number
}

export interface Actions<T> {
  setTouched(touched: Touched<T>): void
  setErrors(errors: Errors<T>): void
  setSubmitting(isSubmitting: boolean): void
  setValues(values: T): void
  resetForm(): void
  submitForm(): void
  setState(state: State<T>): void
}

export interface Handlers {
  handleSubmit: (e?: React.FormEvent<HTMLFormElement>) => void
  handleBlur(e: React.FocusEvent<any>): void
  handleBlur<T = string | any>(fieldOrEvent: T): T extends string ? ((e: any) => void) : void
  handleChange(e: React.ChangeEvent<any>): void
  handleChange<T = unknown | React.ChangeEvent<any>>(
    field: T,
  ): T extends React.ChangeEvent<any> ? void : ((e: unknown | React.ChangeEvent<any>) => void)
}

export interface ErrorMessageProps<T> {
  name: keyof T & string
  className?: string
  component?: string | React.ComponentType
  children?: (error: string) => React.ReactNode
  [key: string]: any
}

export interface FieldProps<T = any> {
  name: string
  value: T
  onChange: any
  onBlur?: any
}
