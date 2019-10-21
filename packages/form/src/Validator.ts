import { validateSync, ValidationError } from 'class-validator'
import deepmerge from 'deepmerge'
import { plainToClass } from 'class-transformer'
import set from 'lodash.set'
import { Errors, State, Actions, Methods } from './types'
import { isPromise } from './utils/isPromise'

export class Validator<T> {
  constructor(
    private Model: any,
    private state: State<T>,
    private actions: Actions<T>,
    private methods: Methods<T>,
  ) {}

  // TODO: may be should expose all error
  private formatErrorsFromMeta(
    validateMetaErrors: ValidationError[],
    errors: any = {},
    parentKey: string = '',
  ): Errors<T> {
    for (const error of validateMetaErrors) {
      let { property } = error
      if (error.children.length) {
        this.formatErrorsFromMeta(error.children, errors, property)
      } else {
        const errorValues = Object.values(error.constraints)
        const key = parentKey ? `${parentKey}.${property}` : property
        set(errors, key, errorValues[0])
      }
    }
    return errors
  }

  validateForm = async (): Promise<Errors<T>> => {
    let errors: Errors<T> = {}
    const { methods, state, actions } = this
    const values: any = plainToClass(this.Model, state.values)

    // class-validator validate
    const validateMetaErrors: ValidationError[] = (validateSync as any)(values)

    errors = this.formatErrorsFromMeta(validateMetaErrors)

    if (!methods.validate) return errors

    // function validate
    let validateFnErrors = methods.validate(values, { state, actions })

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
}
