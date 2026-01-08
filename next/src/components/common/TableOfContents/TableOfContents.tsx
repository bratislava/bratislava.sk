import { Typography } from '@bratislava/component-library'
import { useTranslation } from 'next-i18next'

import Button from '@/src/components/common/Button/Button'
import HorizontalDivider from '@/src/components/common/Divider/HorizontalDivider'
import useHeadings from '@/src/components/common/TableOfContents/useHeadings'
import cn from '@/src/utils/cn'

type Props = {
  scrollOffset?: number
  className?: string
}

// Prevents from scrolling the clicked table of contents item to the very top of window,
// which would hide it behind navbar on small screens. Works also for desktop, so is set to default.
const DEFAULT_SCROLL_OFFSET = 90

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=16846-20086&t=ETyVhQnBPMeYXsm0-4
 * Based on OLO: https://github.com/bratislava/olo.sk/tree/master/next/src/components/common/TableOfContents
 */

const TableOfContents = ({ scrollOffset = DEFAULT_SCROLL_OFFSET, className }: Props) => {
  const { t } = useTranslation()
  const headings = useHeadings()

  const handleItemPress = (id: string) => {
    const element = document.querySelector(`#${id}`)
    if (!element) {
      return
    }

    const elementPosition = element.getBoundingClientRect().top // current offset regarding the current window scroll
    const windowOffset = window.scrollY
    const offsetPosition = elementPosition + windowOffset - scrollOffset

    window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
  }

  return (
    <div
      className={cn(
        'flex flex-col overflow-hidden rounded-lg border border-border-passive-primary bg-background-passive-base px-6',
        className,
      )}
    >
      <div className="py-6">
        <Typography variant="h5" as="h2">
          {t('TableOfContents.title')}
        </Typography>
      </div>

      <HorizontalDivider />

      {/* TODO setup correct responsive design for small screens - now it is just a guess  */}
      <ul className="flex flex-col py-4">
        {headings?.length
          ? headings.map((heading) => {
              return (
                <li key={heading.id} className="py-2 lg:py-3">
                  <Button
                    variant="link"
                    className="text-left"
                    onPress={() => {
                      handleItemPress(heading.id)
                    }}
                  >
                    {heading.text}
                  </Button>
                </li>
              )
            })
          : null}
      </ul>
    </div>
  )
}

export default TableOfContents
