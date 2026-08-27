import { useEffect, useRef, useState } from 'react'
import { useIsClient } from 'usehooks-ts'

export type CookiebotBannerFailure =
  /**
   * The whole `window.Cookiebot` is absent, typically when an ad blocker removed the script.
   */
  | 'script-missing'
  /**
   * The API call succeeded but no banner is visible. Cookiebot only renders its
   * dialog on domains registered in the Cookiebot account, so this is the usual
   * outcome on localhost without a working GTM preview.
   */
  | 'banner-not-rendered'

const isCookiebotDialogVisible = () => {
  const dialog = document.getElementById('CybotCookiebotDialog')

  if (!dialog) {
    return false
  }

  //Check if actually visible, not just present in DOM
  const { width, height } = dialog.getBoundingClientRect()

  return width > 0 && height > 0
}

export const useCookiebotBanner = () => {
  const isClient = useIsClient()
  const [cookiebotBannerFailure, setCookiebotBannerFailure] =
    useState<CookiebotBannerFailure | null>(null)
  const dialogCheckRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => () => clearTimeout(dialogCheckRef.current), [])

  const showCookiebotBanner = () => {
    if (!isClient) {
      return
    }

    // renew() reopens the banner even after the user has already answered, which
    // is what we need when they are revisiting a previous decision. show() only
    // covers the not-yet-answered case, so it is the fallback.
    if (typeof window.Cookiebot?.renew === 'function') {
      window.Cookiebot.renew()
    } else if (typeof window.Cookiebot?.show === 'function') {
      window.Cookiebot.show()
    } else {
      setCookiebotBannerFailure('script-missing')

      return
    }

    clearTimeout(dialogCheckRef.current)

    dialogCheckRef.current = setTimeout(
      () => {
        setCookiebotBannerFailure(isCookiebotDialogVisible() ? null : 'banner-not-rendered')
      },
      // Wait some time before assuming that the dialog element failed to render.
      1000,
    )
  }

  const dismissCookiebotBannerFailure = () => setCookiebotBannerFailure(null)

  return {
    showCookiebotBanner,
    cookiebotBannerFailure,
    dismissCookiebotBannerFailure,
  }
}
