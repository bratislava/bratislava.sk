export const firstCharToLower = (input: string | undefined): string => {
  if (!input) {
    return ''
  }

  return input.charAt(0).toLowerCase() + input.slice(1)
}

export const firstCharToUpper = (input: string | undefined): string => {
  if (!input) {
    return ''
  }

  return input.charAt(0).toUpperCase() + input.slice(1)
}
