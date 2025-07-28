import { useEffect, useRef, useState } from 'react'

export type Heading = {
  level: number
  text: string
  id: string
  ref: React.RefObject<Element>
}

// Assign this attribute to elements, which should be queried for headings
export const TABLE_OF_CONTENTS_HEADING_ATTRIBUTE = {
  'data-table-of-contents': true,
}

/**
 * Based on OLO: https://github.com/bratislava/olo.sk/tree/master/next/src/components/common/TableOfContents
 *
 * TODO on page refresh, headings pop after page content is painted - find out if we can display all at once
 */

const useHeadings = ({ maxHeadingLevel = 6 }: { maxHeadingLevel?: 2 | 3 | 4 | 5 | 6 } = {}) => {
  const [headings, setHeadings] = useState<Heading[]>([])
  const refs = useRef<Record<string, React.RefObject<Element>>>({})

  const headingLevelsToQuery = [2, 3, 4, 5, 6].filter((level) => level <= maxHeadingLevel)

  const updateHeadings = () => {
    const queryList = headingLevelsToQuery
      .map((level) => `main :is(div[data-table-of-contents]) h${level}`)
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

  useEffect(() => {
    updateHeadings()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return headings
}

export default useHeadings
