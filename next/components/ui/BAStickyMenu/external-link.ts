export const isItExternal = (link: string) => {
  if (link.startsWith('http')) return link;
  return '/' + link;
};
