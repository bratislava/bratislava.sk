export enum STICKY_MENU_VISIBILITY {
  INVISIBLE,
  VISIBLE,
}

export enum MENU_STATE {
  OUT,
  ON,
}

export enum PANEL_STATE {
  VISIBLE,
  HIDDEN,
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
