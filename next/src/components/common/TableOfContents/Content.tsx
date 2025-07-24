import Button from '@/src/components/common/Button/Button'
import { Heading } from '@/src/components/common/TableOfContents/useHeadings'

type Props = {
  headings: Heading[]
  scrollOffset?: number
}

// Prevents from scrolling the clicked table of contents item to the very top of window,
// which would hide it behind navbar on small screens. Works also for desktop, so is set to default.
const DEFAULT_SCROLL_OFFSET = 90

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=16846-20086&t=ETyVhQnBPMeYXsm0-4
 * Based on OLO: https://github.com/bratislava/olo.sk/tree/master/next/src/components/common/TableOfContents
 */

const Content = ({ headings, scrollOffset = DEFAULT_SCROLL_OFFSET }: Props) => {
  const handleContentItemPress = (id: string) => {
    const element = document.querySelector(`#${id}`)
    if (!element) {
      return
    }

    const elementPosition = element?.getBoundingClientRect().top ?? 0 // current offset regarding the current window scroll
    const windowOffset = window.scrollY
    const offsetPosition = elementPosition + windowOffset - (scrollOffset ?? 0)

    window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
  }

  return (
    <div key="table-of-contents" className="flex flex-col lg:px-6 lg:py-2">
      {headings.map((heading) => {
        return heading.level === 2 ? (
          <Button
            key={heading.id}
            variant="unstyled"
            onPress={() => handleContentItemPress(heading.id)}
            className="py-3 text-left hover:underline lg:py-4"
          >
            {heading.text}
          </Button>
        ) : (
          <div key={heading.id} className="flex flex-col px-4 first:pt-4 last:pb-4">
            <Button
              key={heading.id}
              variant="unstyled"
              onPress={() => handleContentItemPress(heading.id)}
              className="border-l border-border-passive-primary py-2 pl-4 text-left hover:underline"
            >
              {heading.text}
            </Button>
          </div>
        )
      })}
    </div>
  )
}

export default Content
