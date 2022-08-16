export enum STICKY_MENU_VISIBILITY {
  INVISIBLE,
  VISIBLE,
}

export function isObserverIntersectingBottom(observerBottomBorder: number): boolean {
  return observerBottomBorder < window.innerHeight
}

function isSmallScreen({ width, height }: { width: number; height: number }, isIntersecting: boolean): boolean {
  return width === 0 && height === 0 && !isIntersecting
}

export function getStickyMenuState({
  boundingClientRect,
  isIntersecting,
}: IntersectionObserverEntry): STICKY_MENU_VISIBILITY {
  if (isSmallScreen(boundingClientRect, isIntersecting)) {
    return STICKY_MENU_VISIBILITY.INVISIBLE
  }

  if (!isIntersecting) {
    return STICKY_MENU_VISIBILITY.VISIBLE
  }

  return STICKY_MENU_VISIBILITY.INVISIBLE
}
