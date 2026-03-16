export const formatWithNonBreakingHyphen = (titleText: string) => {
  return titleText.replace(/(\w)-(\w)/g, '$1\u2011$2')
}
