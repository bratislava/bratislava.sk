import { SectionContainer } from '@bratislava/ui-bratislava'
import * as Sentry from '@sentry/nextjs'
import cx from 'classnames'
import AccountNavBar from 'components/forms/segments/AccountNavBar/AccountNavBar'
import { usePageWrapperContext } from 'components/layouts/PageWrapper'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'

interface LoginRegisterLayoutProps {
  className?: string
  children: ReactNode
}

const LoginRegisterLayout = ({
  className,
  children,
}: React.HTMLAttributes<HTMLDivElement> & LoginRegisterLayoutProps) => {
  const { locale, localizations = [] } = usePageWrapperContext()
  const router = useRouter()

  const [t] = useTranslation('common')

  const handleLanguageChange = async ({ key }: { key: string }) => {
    const path = localizations.find((l) => l.locale === key)?.slug || ''
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    try {
      await router.push(`/${path}`, undefined, { locale: key })
    } catch (error) {
      Sentry.captureException(error)
    }
  }

  return (
    <div className={cx('flex', 'flex-col', 'min-h-screen', 'font-inter', className)}>
      <div className="h-16 bg-white lg:h-14">
        <SectionContainer>
          <AccountNavBar
            currentLanguage={locale}
            onLanguageChange={handleLanguageChange}
            languages={[
              { key: 'sk', title: t('language_short.sk') },
              { key: 'en', title: t('language_short.en') },
            ]}
          />
        </SectionContainer>
      </div>

      <div className="bg-main-100 flex grow">{children}</div>
    </div>
  )
}

export default LoginRegisterLayout
