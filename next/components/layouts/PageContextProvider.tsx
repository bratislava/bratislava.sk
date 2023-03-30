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
  localizations?: PageLocalization[]
  slug?: string
}

const PageContextProvider = ({ children, localizations, slug }: IProps) => {
  const {
    i18n: { language },
  } = useTranslation()
  const pageLocalizations: PageLocalization[] = useMemo(() => {
    const base: PageLocalization[] = []
    if (language && slug) {
      base.push({ locale: language, slug: localePath(language, slug) })
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
    <PageContext.Provider value={{ locale: language, localizations: pageLocalizations }}>
      {children}
    </PageContext.Provider>
  )
}

export const usePageContext = () => useContext(PageContext)
export default PageContextProvider
