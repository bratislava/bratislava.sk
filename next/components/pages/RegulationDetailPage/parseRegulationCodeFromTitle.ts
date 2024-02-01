function parseRegulationCodeFromTitle(title: string | null | undefined): {
  year: number
  number: number
  code: string
} {
  if (!title) {
    return { year: -1, number: -1, code: 'invalid' }
  }
  const matches = title.match(/[Vv][Zz][Nn].*?(?<numberMatch>\d{1,2}).*?(?<yearMatch>\d{4})/)
  const year = +(matches?.groups?.yearMatch ?? -1)
  const number = +(matches?.groups?.numberMatch ?? -1)
  const code = `VZN ${number}/${year}`
  return { year, number, code }
}

export default parseRegulationCodeFromTitle
