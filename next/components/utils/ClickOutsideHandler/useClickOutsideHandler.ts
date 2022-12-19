import { MutableRefObject, useRef } from 'react'
import { useOutsideClick } from 'rooks'

interface HookResult {
  clickOutsideRef: MutableRefObject<never | null>
}

export const useClickOutsideHandler = (
  onClickOutside: (event: MouseEvent) => void,
  shouldHandleClick?: boolean,
): HookResult => {
  const clickOutsideRef: MutableRefObject<never | null> = useRef(null)
  useOutsideClick(
    clickOutsideRef as unknown as MutableRefObject<HTMLElement>,
    onClickOutside,
    shouldHandleClick,
  )

  return {
    clickOutsideRef,
  }
}
