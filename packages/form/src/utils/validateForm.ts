import { validateSync, ValidationError } from 'class-validator'
import { Errors, IModel, State } from '../types'
import { isPromise } from './isPromise'

/**
 * validate entire Form
 * @param state Form values
 */
export function validateForm<T>(
  state: State<T>,
  methods: IModel<T>,
): Promise<Errors<T>> | Errors<T> {
  const errors: Errors<T> = {}

  // class-validator validate
  const validateMetaErrors: ValidationError[] = (validateSync as any)(state.values)
  for (const error of validateMetaErrors) {
    const values = Object.values(error.constraints)
    // TODO: may be should expose all error
    errors[error.property] = values[0]
  }

  if (!methods.validate) {
    return errors
  }

  // function validate
  let validateFnErrors = methods.validate(state.values)

  // sync validate
  if (!isPromise(validateFnErrors)) {
    // TODO: may be should deep merge
    return { ...errors, ...validateFnErrors }
  }

  return new Promise((resolve, reject) => {
    validateFnErrors
      .then((errorData: any) => {
        if (errorData) {
          // TODO: may be should deep merge
          resolve({ ...errors, ...errorData })
        } else {
          resolve(errors)
        }
      })
      .catch((e: any) => {
        reject(e)
      })
  })
}
