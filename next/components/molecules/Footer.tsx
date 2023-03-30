import { Footer as UIFooter } from '@bratislava/ui-bratislava'
import { useGeneralContext } from '@utils/generalContext'
import { parseFooter } from '@utils/page'
import { useTranslation } from 'next-i18next'
import * as React from 'react'
import { useMemo } from 'react'

import { usePageContext } from '../layouts/PageContextProvider'

const Footer = () => {
  const { locale: currentLocale, localizations = [] } = usePageContext()
  const { footer } = useGeneralContext()
  const [t] = useTranslation('common')

  const languageLinks = localizations.map(({ locale, slug }) => ({
    title: t(`language_long.${locale}`),
    url: locale === currentLocale ? undefined : slug,
    locale,
  }))

  const parsedFooter = useMemo(() => parseFooter(footer?.data?.attributes), [footer])

  return (
    <div className="mt-24">
      <div className="px-8">
        <div className="mx-auto max-w-screen-lg">
          <hr />
          <UIFooter className="pb-14" {...parsedFooter} languageLinks={languageLinks} />
        </div>
      </div>
    </div>
  )
}

export default Footer
