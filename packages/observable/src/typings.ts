export type Reaction = () => any
export type Scheduler = (reaction: Reaction) => any

export interface Runner {
  reaction: Reaction
  scheduler: Scheduler | undefined
}

export interface Options {
  lazy?: boolean
  scheduler?: Scheduler
}

export type ActionFn = (args?: any[]) => any | Promise<any>
