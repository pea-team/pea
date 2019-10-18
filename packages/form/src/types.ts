import React, { FC, ReactElement } from 'react'

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
  handleSubmit: (e?: React.FormEvent<HTMLFormElement>) => Promise<any>
  handleBlur(e: React.FocusEvent<any>): Promise<any>
  handleBlur<T = string | any>(
    fieldOrEvent: T,
  ): T extends string ? ((e: any) => void) : Promise<any>
  handleChange(e: React.ChangeEvent<any>): Promise<any>
  handleChange<T = unknown | React.ChangeEvent<any>>(
    field: T,
  ):
    | (T extends React.ChangeEvent<any> ? void : ((e: unknown | React.ChangeEvent<any>) => void))
    | Promise<any>
}

export interface ErrorMessageProps<T> {
  name: string
  className?: string
  component?: string | React.ComponentType
  children?: (error: string) => React.ReactNode
  [key: string]: any
}

export interface NameProps<T = any> {
  name: string
  value: T
  onChange: any
  onBlur?: any
}

export interface FieldProps {
  name: string
  children?: ReactElement
  origin?: boolean
}

export interface NameOptions {
  onBlur: boolean
}

export interface Result<F, T> {
  state: State<T>
  handlers: Handlers
  actions: Actions<T>
  name(name: string, options?: NameOptions): NameProps
  error(name: string): string | null
  Field: FC<FieldProps & F>
  ErrorMessage: FC<ErrorMessageProps<T>>
  Form: FC
}
