import { localePath } from '@utils/page'
import cx from 'classnames'
import { localePath } from '@utils/page'
import orderBy from 'lodash/orderBy'
import { useTranslation } from 'next-i18next'
import { createContext, MutableRefObject, ReactNode, useContext, useMemo } from 'react'

interface PageLocalization {
  locale: string
  slug: string
}

interface IPageWrapperContext {
  locale?: string
  localizations: PageLocalization[]
  homepageRef: MutableRefObject<HTMLDivElement | null>
}

const PageWrapperContext = createContext<IPageWrapperContext>({
  localizations: [],
  homepageRef: {} as MutableRefObject<HTMLDivElement>,
})

interface IProps {
  className?: string
  children?: ReactNode
  locale?: string
  localizations?: PageLocalization[]
  slug?: string
  ref: MutableRefObject<HTMLDivElement | null>
}

const PageWrapper = ({ children, locale, localizations, slug, className, ref }: IProps) => {
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
    <PageWrapperContext.Provider
      value={{ locale: locale ?? language, localizations: pageLocalizations, homepageRef: ref }}
    >
      <div className={cx('bg-background font-inter', className)}>{children}</div>
    </PageWrapperContext.Provider>
  )
}

export const usePageWrapperContext = () => useContext(PageWrapperContext)
export default PageWrapper
