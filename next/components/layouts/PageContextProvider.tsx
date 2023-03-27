// @ts-strict-ignore
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable lodash/collection-ordering */
import { localePath } from '@utils/page'
import orderBy from 'lodash/orderBy'
import { useTranslation } from 'next-i18next'
import { createContext, useContext, useMemo } from 'react'

interface PageLocalization {
  locale: string
  slug: string
}

interface IPageContext {
  locale?: string
  localizations: PageLocalization[]
}

const PageContext = createContext<IPageContext>({
  localizations: [],
})

interface IProps {
  children?: React.ReactNode
  locale?: string
  localizations?: PageLocalization[]
  slug?: string
}

const PageContextProvider = ({ children, locale, localizations, slug }: IProps) => {
  const [, { language }] = useTranslation()
  const pageLocalizations: PageLocalization[] = useMemo(() => {
    const base: PageLocalization[] = []
    if (locale) {
      base.push({ locale, slug: localePath(locale, slug) })
    }

    localizations?.forEach((l) => {
      base.push({
        locale: l.locale,
        slug: localePath(l.locale, l.slug),
      })
    })

    return orderBy(base, 'locale')
  }, [localizations])

  return (
    <PageContext.Provider value={{ locale: locale ?? language, localizations: pageLocalizations }}>
      {children}
    </PageContext.Provider>
  )
}

export const usePageContext = () => useContext(PageContext)
export default PageContextProvider
