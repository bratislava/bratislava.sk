import { useUIContext } from '@bratislava/common-frontend-ui-context'
import cx from 'classnames'

import { isItExternal } from '../BAStickyMenu/external-link'

export interface SubpageListProps {
  className?: string
  subpageList?: { title?: string; url?: string; anchor?: string }[]
}

export const SubpageList = ({ className, subpageList }: SubpageListProps) => {
  const { Link: UILink } = useUIContext()
  return (
    <div className={cx('grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-32 mb-16 mt-10', className)}>
      {subpageList?.map((subpage, index) => (
        <div key={index}>
          <UILink href={subpage.url ? isItExternal(subpage.url) : `#${subpage.anchor}`} className="block h-full w-full">
            <div className="group inline-flex cursor-pointer flex-row items-start sm:flex-col sm:items-start sm:space-y-5">
              <div className="text-h3 flex h-12 w-12 shrink-0 grow-0 basis-12 items-center justify-center rounded-full bg-primary text-white sm:h-16 sm:w-16 sm:basis-16">
                {index + 1}
              </div>
              <span className="text-button-1 ml-8 font-medium not-italic leading-6 tracking-wide group-hover:underline sm:ml-0">
                {subpage.title}
              </span>
            </div>
          </UILink>
        </div>
      ))}
    </div>
  )
}

export default SubpageList
