import { PageEntityFragment } from '@/src/services/graphql'

/*
 * TODO consider extracting 'starz' regex to some external config,
 * to unify all hardcoded 'starz' strings and regexes
 */

export const getPageColor = (page: PageEntityFragment) => {
  const isStarzPage = page.adminGroups.some((adminGroup) => {
    return !!adminGroup?.title && /starz/i.test(adminGroup.title)
  })

  return isStarzPage ? 'starz' : page.pageCategory?.color
}
