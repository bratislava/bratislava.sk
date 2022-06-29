import { LocalizationFragment } from '@bratislava/strapi-sdk-homepage'
import orderBy from 'lodash/orderBy'
import { useTranslation } from 'next-i18next'
import { createContext, useContext, useMemo } from 'react'
import { localePath } from '../../utils/page'

interface PageLocalization {
  locale: string
  slug: string
}

interface IPageWrapperContext {
  locale?: string
  localizations: PageLocalization[]
}

const PageWrapperContext = createContext<IPageWrapperContext>({
  localizations: [],
})

interface IProps {
  children?: React.ReactNode
  locale?: string
  localizations?: PageLocalization[]
  slug?: string
}

const PageWrapper = ({ children, locale, localizations, slug }: IProps) => {
  const [_, { language }] = useTranslation()

  const pageLocalizations: PageLocalization[] = useMemo(() => {
    const base: PageLocalization[] = []

    if (locale && slug) {
      base.push({ locale, slug: localePath(locale, slug) })
    }

    localizations?.forEach((l) => {
      if (!l.locale || !l.slug) return
      base.push({
        locale: l.locale,
        slug: localePath(l.locale, l.slug),
      })
    })

    return orderBy(base, 'locale')
  }, [localizations])

  return (
    <PageWrapperContext.Provider value={{ locale: locale ?? language, localizations: pageLocalizations }}>
      {children}
    </PageWrapperContext.Provider>
  )
}

export const usePageWrapperContext = () => useContext(PageWrapperContext)

export default PageWrapper
