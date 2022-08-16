export enum STICKY_MENU_VISIBILITY {
  INVISIBLE,
  VISIBLE,
}

export function isObserverIntersectingBottom(observerBottomBorder: number): boolean {
  return observerBottomBorder !== 0
}

export function getStickyMenuState({ isIntersecting }: IntersectionObserverEntry): STICKY_MENU_VISIBILITY {
  if (!isIntersecting) {
    return STICKY_MENU_VISIBILITY.VISIBLE
  }

  return STICKY_MENU_VISIBILITY.INVISIBLE
}
