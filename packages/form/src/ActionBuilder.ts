import produce from 'immer'

import { State, Errors, Touched } from './types'

export class ActionBuilder<T> {
  constructor(
    private state: State<T>,
    private setState: any, // TODO: handle any
    private initialValue: State<T>,
  ) {}

  resetForm = () => {
    this.setState(this.initialValue)
  }

  setTouched = (touched: Touched<T>) => {
    const nextState = produce<State<T>, State<T>>(this.state, draft => {
      draft.touched = touched
    })
    this.setState({ ...nextState })
  }

  setErrros = (errors: Errors<T>) => {
    const nextState = produce<State<T>, State<T>>(this.state, draft => {
      draft.errors = errors
    })
    this.setState({ ...nextState })
  }

  setValues = (values: T) => {
    const nextState = produce<State<T>, State<T>>(this.state, draft => {
      draft.values = values
    })
    this.setState({ ...nextState })
  }

  setSubmitting = (submitting: boolean) => {
    const nextState = produce<State<T>, State<T>>(this.state, draft => {
      draft.submitting = submitting
    })
    this.setState({ ...nextState })
  }
}
