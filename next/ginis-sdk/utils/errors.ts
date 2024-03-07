// may get more data later
// for now serves as a way to easily distinguish in client code by instance type
export class GinisError extends Error {
  constructor(message: string) {
    super(message)
  }
}
