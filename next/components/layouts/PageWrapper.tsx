import { localePath } from '@utils/page'
import cx from 'classnames'
import orderBy from 'lodash/orderBy'
import { useTranslation } from 'next-i18next'
import { createContext, ReactNode, useContext, useMemo } from 'react'

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
  className?: string
  children?: ReactNode
  locale?: string
  localizations?: PageLocalization[]
  slug?: string
}

const PageWrapper = ({ children, locale, localizations, slug, className }: IProps) => {
  const [_, { language }] = useTranslation()
  const pageLocalizations: PageLocalization[] = useMemo(() => {
    const base: PageLocalization[] = []
    if (locale && slug) {
      base.push({ locale, slug: localePath(locale, slug) })
    }

    localizations?.forEach((l) => {
      base.push({
        locale: l.locale,
        slug: localePath(l.locale, l.slug),
      })
    })

    return orderBy(base, 'locale')
  }, [locale, localizations, slug])

  return (
    <PageWrapperContext.Provider value={{ locale: locale ?? language, localizations: pageLocalizations }}>
      <div className={cx('bg-background font-inter', className)}>{children}</div>
    </PageWrapperContext.Provider>
  )
}

export const usePageWrapperContext = () => useContext(PageWrapperContext)
export default PageWrapper
