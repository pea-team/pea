import { validateSync, ValidationError } from 'class-validator'

type ErrMsg = string | null

/**
 * validate one field by name from Form
 * @param values Form values
 * @param name Form field name
 */
export function validateField<V>(values: V, name: string) {
  let errMsg: ErrMsg = null
  const errors: ValidationError[] = (validateSync as any)(values)
  const error = errors.find(e => e.property === name)

  if (error) {
    // TODO: need handle error array
    const values = Object.values(error.constraints)
    errMsg = values[0]
  }

  return errMsg
}
