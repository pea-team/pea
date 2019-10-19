import { validateSync, ValidationError } from 'class-validator'
import deepmerge from 'deepmerge'
import { Errors, IModel, State, Actions } from '../types'
import { isPromise } from './isPromise'

/**
 * validate entire Form
 * @param state Form values
 */
export async function validateForm<T>(
  state: State<T>,
  actions: Actions<T>,
  methods: IModel<T>,
): Promise<Errors<T>> {
  const errors: Errors<T> = {}

  // class-validator validate
  const validateMetaErrors: ValidationError[] = (validateSync as any)(state.values)

  for (const error of validateMetaErrors) {
    const values = Object.values(error.constraints)
    // TODO: may be should expose all error
    errors[error.property] = values[0]
  }

  if (!methods.validate) return errors

  // function validate
  let validateFnErrors = methods.validate(state.values, { state, actions })

  // sync validate
  if (!isPromise(validateFnErrors)) {
    return deepmerge<Errors<T>>(errors, validateFnErrors)
  }

  try {
    const errorData = await validateFnErrors
    return deepmerge<Errors<T>>(errors, errorData)
  } catch {
    return errors
  }
}
