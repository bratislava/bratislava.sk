export const base64Encode = (input: string) => {
  return Buffer.from(input).toString('base64')
}

export const base64Decode = (input: string) => {
  return Buffer.from(input, 'base64').toString('utf8')
}
