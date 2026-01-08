import { useEffect, useState } from 'react'

export type Heading = {
  text: string
  id: string
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

  const updateHeadings = () => {
    const headingsQuery = 'main :is(div[data-table-of-contents]) h2'
    const headingsNodeList = document.querySelectorAll(headingsQuery)

    const updatedHeadings = Array.from(headingsNodeList).map((element) => {
      const { id, textContent } = element

      return {
        id,
        text: textContent ?? '""',
      }
    })
    setHeadings(updatedHeadings)
  }

  useEffect(() => {
    updateHeadings()
  }, [])

  return headings
}

export default useHeadings
