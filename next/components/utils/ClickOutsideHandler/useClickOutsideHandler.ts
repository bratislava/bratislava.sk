import { MutableRefObject, useRef } from 'react'
import { useOutsideClick } from 'rooks'

interface HookResult {
  clickOutsideRef: MutableRefObject<never | null>
}

export const useClickOutsideHandler = (onClickOutside: () => void): HookResult => {
  const clickOutsideRef: MutableRefObject<never | null> = useRef(null)

  const handleOutsideClick = () => {
    onClickOutside()
  }
  useOutsideClick(clickOutsideRef as unknown as MutableRefObject<HTMLElement>, handleOutsideClick)

  return {
    clickOutsideRef,
  }
}
