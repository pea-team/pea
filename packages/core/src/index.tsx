import { render } from 'react-dom'

export default class Pea {
  static config: any = {
    root: '#root',
  }

  static updateConfig(partialConfig: object) {
    Pea.config = {
      ...Pea.config,
      ...partialConfig,
    }
  }

  static async bootstrap(element: any, root = '#root') {
    render(element, document.querySelector(root))
  }
}
