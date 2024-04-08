export type OmitFirstArg<F> = F extends (x: any, ...args: infer P) => infer R
  ? (...args: P) => R
  : never

export type OmitFirstTwoArgs<F> = F extends (x: any, y: any, ...args: infer P) => infer R
  ? (...args: P) => R
  : never
