import { useUIContext } from '@bratislava/common-frontend-ui-context'
import { isExternalLink } from '@utils/isExternalLink'
import cx from 'classnames'

export interface SubpageListProps {
  className?: string
  subpageList?: { title?: string; url?: string; anchor?: string }[]
}

export const SubpageList = ({ className, subpageList }: SubpageListProps) => {
  const { Link: UILink } = useUIContext()
  return (
    <div
      className={cx(
        'grid mb-10 mt-10 grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-10',
        className,
      )}
    >
      {subpageList?.map((subpage, index) => (
        <div
          key={index}
          className="group relative flex items-center sm:items-start gap-y-5 gap-x-8 sm:flex-col"
        >
          <div className="text-h3 flex h-12 w-12 shrink-0 grow-0 basis-12 items-center justify-center rounded-full bg-category-600 text-white sm:h-16 sm:w-16 sm:basis-16">
            {index + 1}
          </div>
          <div className="text-20-medium leading-6 tracking-wide group-hover:underline">
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
