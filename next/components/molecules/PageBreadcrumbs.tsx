import LeftIcon from '@assets/images/chevron-left.svg'
import { useUIContext } from '@bratislava/common-frontend-ui-context'
import { PageCategoryEntityResponse, PageEntityResponse } from '@bratislava/strapi-sdk-homepage'
import { pagePath } from '@utils/page'
import cx from 'classnames'
import * as React from 'react'

interface Props {
  parentPage: PageEntityResponse
  pageCategory: PageCategoryEntityResponse
  title: string
}

const PageBreadcrumbs = ({ parentPage, pageCategory, title }: Props) => {
  const { Link: UILink } = useUIContext()
  const crumbs: { title: string; url: string | null }[] = []
  if (parentPage.data) {
    crumbs.push({
      title: parentPage.data?.attributes?.title ?? '',
      url: pagePath({
        locale: parentPage?.data?.attributes?.locale,
        slug: parentPage?.data?.attributes?.slug,
      }),
    })
  } else if (pageCategory) {
    crumbs.push({ title: pageCategory?.data?.attributes?.title ?? '', url: null })
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
                <LeftIcon className="mt-[-3px] inline-block h-4 w-5 lg:hidden" /> {crumb.title}
              </UILink>
            ) : (
              <span className={cx('hidden lg:inline-block', { 'font-bold': last })}>{crumb.title}</span>
            )}
            {!last && <span className="hidden px-2 lg:inline-block">&gt;</span>}
          </React.Fragment>
        )
      })}
    </>
  )
}

export default PageBreadcrumbs
