import { useUIContext } from '@bratislava/common-frontend-ui-context'
import { PageCategoryEntityResponse, PageEntityResponse, ParentPageFragment } from '@bratislava/strapi-sdk-homepage'
import cx from 'classnames'
import * as React from 'react'

import { pagePath } from '../../utils/page'

interface Props {
  parentPage: PageEntityResponse
  pageCategory: PageCategoryEntityResponse
  title: string
}

const PageBreadcrumbs = ({ parentPage, pageCategory, title }: Props) => {
  const { Link: UILink } = useUIContext()
  const crumbs: { title: string; url: string | null }[] = []

  if (parentPage) {
    crumbs.push({
      title: parentPage.data?.attributes?.title ?? '',
      url: pagePath({
        locale: parentPage?.data?.attributes?.locale,
        slug: parentPage?.data?.attributes?.slug,
      }),
    })
  } else if (pageCategory) {
    crumbs.push({ title: pageCategory.data.attributes.title ?? '', url: null })
  }

  crumbs.push({ title: title ?? '', url: null })
  return (
    <>
      {crumbs.map((crumb, i) => {
        const last = i === crumbs.length - 1

        return (
          <React.Fragment key={i}>
            {crumb.url ? (
              <UILink href={crumb.url} className="hover:underline">
                {crumb.title}
              </UILink>
            ) : (
              <span className={cx({ 'font-bold': last })}>{crumb.title}</span>
            )}
            {!last && <span className="px-2">&gt;</span>}
          </React.Fragment>
        )
      })}
    </>
  )
}

export default PageBreadcrumbs
