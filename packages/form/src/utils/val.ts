import { FieldElement } from '../types'

/**
 *  get form field value
 * @param node Html form Element
 */
export function val(node: FieldElement) {
  let parsed
  const { type, value } = node

  if (/number|range/.test(type)) {
    return (parsed = parseFloat(value)), isNaN(parsed) ? '' : parsed
  }
  if (/checkbox/.test(type) && 'checked' in node) {
    return node.checked
  }

  return value
}
