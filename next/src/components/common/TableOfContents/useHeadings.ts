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
 * Based loosely on OLO: https://github.com/bratislava/olo.sk/tree/master/next/src/components/common/TableOfContents
 *
 * TODO on page refresh, headings pop after page content is painted - find out if we can display all at once
 */

const useHeadings = () => {
  const [headings, setHeadings] = useState<Heading[]>([])
  const refs = useRef<Record<string, React.RefObject<Element>>>({})

  const updateHeadings = () => {
    const headingsQuery = 'main :is(div[data-table-of-contents]) h2'
    const headingsNodeList = document.querySelectorAll(headingsQuery)

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
