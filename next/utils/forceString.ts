/**
 * Turn unknown values into (empty) strings, return string if it's a string
 *
 * @param input
 * @param separator
 */
export const forceString = (input: unknown, separator = ',') => {
  if (typeof input === 'string') return input
  if (typeof input === 'number') return input.toString()
  if (Array.isArray(input)) return input.join(separator)
  return ''
}
