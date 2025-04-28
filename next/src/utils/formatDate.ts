// "01. 03. 2021"
export const formatDate = (dateISOString: string | undefined | null) => {
  if (!dateISOString) return ''
  const date = new Date(dateISOString)

  return date.toLocaleDateString('sk-SK', { month: '2-digit', day: '2-digit', year: 'numeric' })
}
