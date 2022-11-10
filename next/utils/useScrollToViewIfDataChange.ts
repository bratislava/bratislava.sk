import { RefObject, useEffect, useState } from 'react'
import scrollIntoView from 'smooth-scroll-into-view-if-needed'
import { useIsFirstRender, useIsomorphicLayoutEffect } from 'usehooks-ts'

export const useScrollToViewIfDataChange = <T extends object | null, K extends object>(
  data: T | undefined,
  filters: K,
  elementRef: RefObject<HTMLElement>
) => {
  // We don't want to scroll to the content initially.
  const isFirst = useIsFirstRender()

  // Relying on data change is not sufficient, first filters are changed and then data are asynchronously fetched.
  // Therefore, we mark filters as changed to scroll when needed. However, sometimes data change without any filter change
  // (e.g. when the library revalidates the data on focus), in this case we don't want to scroll to the content.
  const [filtersChanged, setFiltersChanged] = useState(false)

  useEffect(() => {
    if (isFirst) {
      return
    }

    setFiltersChanged(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters])

  useIsomorphicLayoutEffect(() => {
    if (!elementRef?.current || isFirst || !filtersChanged) {
      return
    }

    setFiltersChanged(false)

    // scrollMode: 'if-needed' doesn't work as expected
    const topIsNotVisible = elementRef.current.getBoundingClientRect().top < 0
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    if (topIsNotVisible) {
      scrollIntoView(elementRef.current, {
        scrollMode: 'if-needed',
        block: 'start',
        inline: 'nearest',
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])
}
