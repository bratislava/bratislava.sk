export const isExternalLink = (link: string) => {
  if (!link) {
    return link
  }
  if (link.startsWith('http')) return link
  return `/${link}`
}
