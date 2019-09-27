import React, { ComponentType } from 'react'
import debounce from 'lodash.debounce'

import { observe as run, unobserve } from '@peajs/observable'
import equal from 'fast-deep-equal'

export function observe<P>(Comp: ComponentType<P>) {
  return class extends React.Component<P> {
    constructor(props: P) {
      super(props)
      this.render = run(this.render, {
        scheduler: debounce(() => {
          this.setState({})
        }, 10),
        lazy: true,
      })
    }

    shouldComponentUpdate(nextProps: any, nextState: any) {
      const { props, state } = this
      if (state !== nextState) return true
      return !equal(props, nextProps)
    }

    componentWillUnmount() {
      unobserve(this.render)
    }

    render() {
      return <Comp {...this.props} />
    }
  }
}
