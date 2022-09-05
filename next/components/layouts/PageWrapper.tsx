/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable lodash/collection-ordering */
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
    <PageWrapperContext.Provider value={{ locale: locale ?? language, localizations: pageLocalizations }}>
      {children}
    </PageWrapperContext.Provider>
  )
}

export const usePageWrapperContext = () => useContext(PageWrapperContext)
export default PageWrapper
