import produce, { original } from 'immer'

import { validateForm } from './validateForm'
import { checkValid } from './checkValid'
import { State, IModel } from '../types'
import { touchAll } from './touchAll'

export function createSubmitHandler<T>(state: State<T>, setState: any, methods: IModel<T>) {
  return function handleSubmit(e: any) {
    if (e && e.preventDefault) e.preventDefault()
    const nextErrors = validateForm(state.values)

    // update state
    const nextState = produce<State<T>, State<T>>(state, draft => {
      if (nextErrors) state.errors = nextErrors

      const isValid = checkValid(draft.errors)
      draft.valid = isValid
      draft.touched = touchAll(state.values)
      draft.submitCount += 1
      draft.submitting = true

      if (!isValid && methods.onError) {
        methods.onError(original<any>(draft.errors))
      }
      if (isValid && methods.onSubmit) {
        methods.onSubmit(draft.values)
      }
    })
    setState({ ...nextState })
  }
}
