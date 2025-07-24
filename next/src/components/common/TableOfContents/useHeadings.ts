import { RefObject, useCallback, useEffect, useRef, useState } from 'react'
import { useIsClient } from 'usehooks-ts'

import { GENERAL_PAGE_CONTENT_ID } from '@/src/components/page-contents/GeneralPageContent'

type HeadingLevels = 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

// add all headings from the content
export const ATTRIBUTE_TABLE_OF_CONTENTS = 'content'

// add heading with this attribute only, do not search through content
export const ATTRIBUTE_TABLE_OF_CONTENTS_HEADING = 'heading'

const useHeadings = () => {
  const [headings, setHeadings] = useState<
    { id: string; text: string; level: number; ref: RefObject<Element> }[]
  >([])
  const isClient = useIsClient()
  const refs = useRef<Record<string, React.RefObject<Element>>>({})

  const getQueryList = useCallback((headingLevels: HeadingLevels[]) => {
    // list of all headings in the parent with data-toc attribute
    const queryList = headingLevels
      .map(
        (level) =>
          `#${GENERAL_PAGE_CONTENT_ID} div[data-toc=${ATTRIBUTE_TABLE_OF_CONTENTS}] ${level}`,
      )
      .join(', ')

    // list of all headings that have directly data-toc attribute with -heading
    const queryListHeadings = headingLevels
      .map(
        (level) =>
          `#${GENERAL_PAGE_CONTENT_ID} div[data-toc=${ATTRIBUTE_TABLE_OF_CONTENTS_HEADING}] ${level}`,
      )
      .join(', ')

    return `${queryList}, ${queryListHeadings}`
  }, [])

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (isClient) {
      const updateHeadings = () => {
        const queryList = getQueryList(['h2', 'h3', 'h4', 'h5', 'h6']) // Move queryList here
        const headingsNodeList = document.querySelectorAll(queryList)

        // eslint-disable-next-line unicorn/prefer-spread
        const updatedHeadings = Array.from(headingsNodeList).map((element) => {
          const { id, textContent, tagName } = element
          refs.current[id] = { current: element }

          return {
            id,
            text: textContent ?? '""',
            level: Number(String(tagName).slice(1).toLowerCase() as HeadingLevels),
            ref: refs.current[id],
          }
        })
        setHeadings(updatedHeadings)
      }

      // Create a MutationObserver to watch for DOM changes
      const observer = new MutationObserver(() => {
        updateHeadings()
      })

      // Observe changes in the root element
      const rootElement = document.querySelector(`#${GENERAL_PAGE_CONTENT_ID}`)
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
    }
  }, [getQueryList, isClient]) // Re-run when rootId or client state changes

  return headings
}

export default useHeadings
