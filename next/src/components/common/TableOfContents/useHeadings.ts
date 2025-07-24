import { useLayoutEffect, useRef, useState } from 'react'

export type Heading = {
  level: number
  text: string
  id: string
  ref: React.RefObject<Element>
}

// Assign this id to the common parent element of all headings which should be included in the table of contents (toc)
// This hook looks for headings only in children elements of this wrapper
export const TABLE_OF_CONTENTS_WRAPPER_ID = 'table-of-contents-wrapper'

// Assign this attribute to elements, which should be queried for headings
export const TABLE_OF_CONTENTS_HEADING_ATTRIBUTE = {
  'data-table-of-contents': true,
}

/**
 * Based on OLO: https://github.com/bratislava/olo.sk/tree/master/next/src/components/common/TableOfContents
 *
 * TODO on page refresh, headings pop after page content is painted - find out if we can display all at once
 */

const useHeadings = ({ maxLevel = 2 }: { maxLevel?: 2 | 3 | 4 | 5 | 6 } = {}) => {
  const [headings, setHeadings] = useState<Heading[]>([])
  const refs = useRef<Record<string, React.RefObject<Element>>>({})

  const headingLevelsToQuery = [2, 3, 4, 5, 6].filter((level) => level <= maxLevel)

  const updateHeadings = () => {
    const queryList = headingLevelsToQuery
      .map((level) => `#${TABLE_OF_CONTENTS_WRAPPER_ID} :is(div[data-table-of-contents]) h${level}`)
      .join(', ')

    const headingsNodeList = document.querySelectorAll(queryList)

    const updatedHeadings = Array.from(headingsNodeList).map((element) => {
      const { id, textContent, tagName } = element
      refs.current[id] = { current: element }

      return {
        id,
        text: textContent ?? '""',
        level: Number(tagName.match(/\d/)),
        ref: refs.current[id],
      }
    })
    setHeadings(updatedHeadings)
  }

  useLayoutEffect(() => {
    // Create a MutationObserver to watch for DOM changes
    // This ensures headings update when visiting a new page
    const observer = new MutationObserver(() => {
      updateHeadings()
    })

    const rootElement = document.querySelector(`#${TABLE_OF_CONTENTS_WRAPPER_ID}`)
    if (rootElement) {
      observer.observe(rootElement, {
        childList: true, // Watch for added/removed child elements
        subtree: true, // Watch the entire subtree of the root element
      })
    }

    // Cleanup the event listener on unmount
    return () => {
      observer.disconnect()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return headings
}

export default useHeadings
