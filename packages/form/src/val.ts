import { FieldElement } from './types'

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
