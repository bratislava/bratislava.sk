import { useEffect, useState } from 'react'

import Button from '@/src/components/common/Button/Button'
import cn from '@/src/utils/cn'

type HeadingProps = {
  level: number
  text: string
  id: string
  ref: React.RefObject<Element>
}

type Props = {
  headings: HeadingProps[]
  headerOffset?: number
}

/**
 * Figma: https://www.figma.com/design/2qF09hDT9QNcpdztVMNAY4/OLO-Web?node-id=3480-20808&node-type=symbol&t=Sy9hMuI0D75f0mQ0-0
 *
 */

// Use Intersection Observer for easier finding active heading, documentation https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
// TODO: use Intersection Observer hook from useHooks https://usehooks.com/useintersectionobserver
const Content = ({ headings, headerOffset }: Props) => {
  const firstHeadingId = headings[0].id
  const [activeHeadingId, setActiveHeadingId] = useState<string>(firstHeadingId)

  useEffect(() => {
    const handleIntersect = (headingEntries: IntersectionObserverEntry[]) => {
      const visible = headingEntries
        .filter((headingEntry) => headingEntry.isIntersecting)
        .sort(
          (headingEntryA, headingEntryB) =>
            headingEntryA.boundingClientRect.top - headingEntryB.boundingClientRect.top,
        )
      if (visible.length > 0) {
        setActiveHeadingId(visible[0].target.id)
      }
    }

    const observer = new IntersectionObserver(handleIntersect, {
      // Add negative margin to bottom of the root,so headlines are highlighted
      // "later" when scrolling, not just after they enter the screen.
      // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#rootmargin
      rootMargin: '0px 0px -50% 0px',
      threshold: 1,
    })

    headings.forEach((heading) => {
      if (heading.ref && heading.ref.current) {
        observer.observe(heading.ref.current)
      }
    })

    return () => observer.disconnect()
  }, [headings, headerOffset])

  const handleContentItemPress = (id: string) => {
    const href = `#${id}`
    const element = document.querySelector(href)
    if (!element) {
      return
    }

    const elementPosition = element?.getBoundingClientRect().top ?? 0 // current offset regarding the current window scroll
    const windowOffset = window.scrollY
    const offsetPosition = elementPosition + windowOffset - (headerOffset ?? 0)

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
            className={cn('py-3 text-left hover:underline lg:py-4', {
              'font-bold': heading.id === activeHeadingId,
            })}
          >
            {heading.text}
          </Button>
        ) : (
          <div key={heading.id} className="flex flex-col px-4 first:pt-4 last:pb-4">
            <Button
              key={heading.id}
              variant="unstyled"
              onPress={() => handleContentItemPress(heading.id)}
              className={cn(
                'border-l border-border-passive-primary py-2 pl-4 text-left hover:underline',
                {
                  'font-bold': heading.id === activeHeadingId,
                },
              )}
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
