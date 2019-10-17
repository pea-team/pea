import { validateSync, ValidationError } from 'class-validator'
import { Errors } from '../types'

/**
 * validate entire Form
 * @param values Form values
 */
export function validateForm<T>(values: T): Errors<T> {
  const errors: Errors<T> = {}
  const validationErrors: ValidationError[] = (validateSync as any)(values)
  for (const error of validationErrors) {
    const values = Object.values(error.constraints)
    // TODO: may be should expose all error
    errors[error.property] = values[0]
  }

  return errors
}
