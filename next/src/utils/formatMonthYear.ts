// "03/2021" - the day is ignored on purpose
// Parsed from the string directly to avoid timezone shifts of `new Date()` on date-only values (e.g. "2021-03-01").
export const formatMonthYear = (dateString: string | undefined | null) => {
  const match = dateString?.match(/^(\d{4})-(\d{2})/)
  if (!match) return null

  const [, year, month] = match

  return `${month}/${year}`
}
