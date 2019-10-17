import React from 'react'

export type FieldElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement

export type Errors<T> = {
  [K in keyof T]?: T[K] extends object ? Errors<T[K]> : string
}

export type Touched<T> = {
  [K in keyof T]?: T[K] extends object ? Touched<T[K]> : boolean
}

export type Validate<T> = (values: T) => any

export interface IModel<T = any> {
  onSubmit?: (values: T) => any
  onError?: (errors: Errors<T>) => any
  onReset?: () => any
  validate?: Validate<T>
}

export interface ModelType<T = any> {
  new (...args: any[]): T
}

export interface State<T> {
  values: T
  errors: Errors<T>
  touched: Touched<T>
  submitting: boolean
  validating: boolean
  dirty: boolean
  valid: boolean
  validateOnChange: boolean
  validateOnBlur: boolean
  submitCount: number
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
