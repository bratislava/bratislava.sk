import { Typography } from '@bratislava/component-library'

import SectionHeader from '@/src/components/layouts/SectionHeader'
import { NumbersOverviewSectionFragment } from '@/src/services/graphql'
import { isDefined } from '@/src/utils/isDefined'

export type NumbersOverviewProps = {
  section: NumbersOverviewSectionFragment
}

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=17952-15665&t=Wf48kVcOZJ5EW5yW-4
 */

const NumbersOverview = ({ section }: NumbersOverviewProps) => {
  const { title, text, showMoreLink, numbersOverviewItems: items } = section

  const filteredItems = items?.filter(isDefined) ?? []

  return (
    <div className="flex flex-col gap-6 lg:gap-18">
      <SectionHeader title={title} text={text} showMoreLink={showMoreLink} />
      <ul className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8 @page-wide:gap-18">
        {filteredItems.map((item) => {
          return (
            <li key={item.id} className="flex min-w-0 flex-col items-center gap-2 lg:items-start">
              <Typography className="text-[2.5rem] leading-[3rem] font-extralight break-all lg:text-[3.5rem] lg:leading-[4rem]">
                {item.number}
              </Typography>
              <Typography variant="p-small">{item.text}</Typography>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default NumbersOverview
