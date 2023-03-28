import LeftIcon from '@assets/images/chevron-left.svg'
import { useUIContext } from '@bratislava/common-frontend-ui-context'
import cx from 'classnames'
import * as React from 'react'

interface Props {
  crumbs: { title: string; url: string | null }[]
}

const PageBreadcrumbs = ({ crumbs }: Props) => {
  const { Link: UILink } = useUIContext()
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
              <span className={cx('hidden lg:inline-block', { 'font-bold': last })}>
                {crumb.title}
              </span>
            )}
            {!last && <span className="hidden px-2 lg:inline-block">&gt;</span>}
          </React.Fragment>
        )
      })}
    </>
  )
}

export default PageBreadcrumbs
