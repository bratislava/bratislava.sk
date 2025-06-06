import { twMerge } from 'tailwind-merge'

import Button from '@/src/components/common/Button/Button'
import { SubpageListPageHeaderSectionFragment } from '@/src/services/graphql'
import { getLinkProps } from '@/src/utils/getLinkProps'
import { isDefined } from '@/src/utils/isDefined'

export type SubpageListProps = {
  subpageList: SubpageListPageHeaderSectionFragment['subpageList']
  className?: string
}

const SubpageList = ({ subpageList, className }: SubpageListProps) => {
  const filteredSubpageList = subpageList?.filter(isDefined) ?? []
  if (filteredSubpageList.length === 0) {
    return null
  }

  return (
    <div
      className={twMerge(
        'mt-10 mb-10 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-10',
        className,
      )}
    >
      {filteredSubpageList.map((subpage, index) => (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          className="group relative flex items-center gap-x-8 gap-y-5 sm:flex-col sm:items-start"
        >
          <div className="flex size-12 shrink-0 grow-0 basis-12 items-center justify-center rounded-full bg-action-background-default text-h3 font-semibold text-white group-hover:bg-action-background-hover sm:size-16 sm:basis-16">
            {index + 1}
          </div>
          {/* FIXME Typography. Convert to use Typograhy. Issue: Different font weight than Figma <p> */}
          <Button
            variant="link"
            stretched
            hasLinkIcon={getLinkProps(subpage).target === '_blank'}
            className="text-size-p-large tracking-wide lg:text-size-p-large"
            {...getLinkProps(subpage)}
          />
        </div>
      ))}
    </div>
  )
}

export default SubpageList
