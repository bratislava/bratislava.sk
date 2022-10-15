export const isRecord = (obj: unknown): obj is Record<PropertyKey, unknown> => {
  return typeof obj === 'object' && obj !== null
}

export const forceString = (input: unknown) => {
  if (typeof input === 'string') return input
  if (typeof input === 'number') return input.toString()
  if (Array.isArray(input)) return input.join(', ')
  return ''
}
