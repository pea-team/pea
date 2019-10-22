import { PeaForm } from '../PeaForm'

type Fn<T> = (values: T) => boolean

export function Exclude<T>(fn: Fn<T>): PropertyDecorator {
  return (target, propertyKey) => {
    PeaForm.updateExcludeMaps(target, propertyKey, fn)
  }
}
