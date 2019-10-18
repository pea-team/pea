// import React from 'react'
import { HandlerBuilder } from './HandlerBuilder'
import { State } from './types'

export type Creator = <T>(handlerBuilder: HandlerBuilder<T>, state: State<T>) => any

export class PeaForm {
  static fieldCreator: any = null
  static itemCreator: any = null
  static register(componentName: 'Field' | 'Item', creator: Creator) {
    // override Field
    if (componentName === 'Field') {
      PeaForm.fieldCreator = creator
    }

    // override Item
    if (componentName === 'Item') {
      PeaForm.itemCreator = creator
    }
  }
}
