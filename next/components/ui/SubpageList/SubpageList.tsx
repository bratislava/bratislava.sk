import { useUIContext } from '@bratislava/common-frontend-ui-context'
import { isExternalLink } from '@utils/isExternalLink'
import cx from 'classnames'

export interface SubpageListProps {
  className?: string
  subpageList?: { title?: string; url?: string; anchor?: string }[]
}

export const SubpageList = ({ className, subpageList }: SubpageListProps) => {
  const { Link: UILink } = useUIContext()

  if (!subpageList || subpageList.length === 0) {
    return null
  }

  return (
    <div
      className={cx(
        'mb-10 mt-10 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-10',
        className,
      )}
    >
      {subpageList.map((subpage, index) => (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          className="group relative flex items-center gap-x-8 gap-y-5 sm:flex-col sm:items-start"
        >
          <div className="text-h3 flex h-12 w-12 shrink-0 grow-0 basis-12 items-center justify-center rounded-full bg-category-600 text-white sm:h-16 sm:w-16 sm:basis-16">
            {index + 1}
          </div>
          <div className="text-20 font-medium leading-6 tracking-wide group-hover:underline">
            <UILink
              href={subpage.url ? isExternalLink(subpage.url) : `#${subpage.anchor}`}
              target={subpage.url?.startsWith('http') ? '_blank' : undefined}
              className="after:absolute after:inset-0"
            >
              {subpage.title}
            </UILink>
          </div>
        </div>
      ))}
    </div>
  )
}

export default SubpageList
