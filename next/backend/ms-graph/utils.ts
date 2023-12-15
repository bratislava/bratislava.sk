/**
 * Returns an ordering score for a role, higher score means higher priority
 *
 * @param role
 */
export const roleOrderingScore = (role: string | null | undefined) => {
  let score = 0
  if (!role) return score
  // puts leadership in front, their secretaries as second
  // counting on 'Veduci/Veduca' and 'Riaditel/Riaditelka' to be the Role names in AD
  // deals with '1. ...' or 'Prvý ...' as super-special role (i.e. '1. námestníčka primátora')
  if (role.startsWith('1.') || role.startsWith('Prv')) {
    score = 6
  } else if (role.startsWith('Vedúc') || role.startsWith('Riadit') || role.startsWith('Poveren')) {
    score = 5
  } else if (role.includes('vedúc') || role.includes('riadit') || role.includes('poveren')) {
    score = 4
  } else if (
    role.startsWith('Hlavná architektka') ||
    role.startsWith('Hlavný architekt') ||
    role.startsWith('Mestská kontrolórka') ||
    role.startsWith('Mestský kontrolór') ||
    role.startsWith('Hlavná ekonómka') ||
    role.startsWith('Hlavný ekonóm')
  ) {
    score = 3
  } else if (role.startsWith('Zástup')) {
    score = 2
  } else if (role.startsWith('Hovor')) {
    score = 1
  }
  return score
}

/**
 * Turn unknown values into (empty) strings, return string if it's a string
 *
 * @param input
 */
export const forceString = (input: unknown) => {
  if (typeof input === 'string') return input
  if (typeof input === 'number') return input.toString()
  if (Array.isArray(input)) return input.join(' ')
  return ''
}
