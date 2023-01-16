interface Args {
  [key: string]: string | number
}

export const formatUnicorn = (str: string, args: Args): string => {
  Object.keys(args).forEach((key: string) => {
    str = str.replace(new RegExp(`\\{${key}\\}`, 'gi'), args[key].toString())
  })

  return str
}
