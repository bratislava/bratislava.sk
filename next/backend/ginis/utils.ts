export const isRecord = (obj: unknown): obj is Record<PropertyKey, unknown> => {
  return typeof obj === 'object' && obj !== null
}

export const forceString = (input: unknown) => {
  if (typeof input === 'string') return input
  if (typeof input === 'number') return input.toString()
  if (Array.isArray(input)) return input.join(', ')
  return ''
}

// GINIS is accessible only from internal network
// if developing from internal network, change here
export const shouldMockGinis = () => {
  return (
    process.env.NODE_ENV === 'development' ||
    process.env.NODE_ENV === 'test' ||
    process.env.CI === 'true'
  )
}
