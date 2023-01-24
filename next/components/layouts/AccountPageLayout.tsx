import { SectionContainer } from '@bratislava/ui-bratislava'
import cx from 'classnames'
import AccountNavBar from 'components/forms/segments/AccountNavBar/AccountNavBar'
import AccountSectionHeader from 'components/forms/segments/AccountSectionHeader/AccountSectionHeader'
import { SectionItemBase } from 'components/forms/types/AccountTypes'
import { usePageWrapperContext } from 'components/layouts/PageWrapper'
import { ReactNode } from 'react'
import { I18nProvider } from 'react-aria'

type AccountPageLayoutBase = {
  className?: string
  children: ReactNode
  sectionsList: SectionItemBase[]
}
const AccountPageLayout = ({ className, children, sectionsList }: AccountPageLayoutBase) => {
  const { locale } = usePageWrapperContext()
  return (
    <div className={cx('flex flex-col min-h-screen', className)}>
      <SectionContainer>
        <AccountNavBar currentLanguage={locale} sectionsList={sectionsList} />
      </SectionContainer>

      <AccountSectionHeader sectionsList={sectionsList} />
      <div className="bg-gray-0 flex grow">{children}</div>
    </div>
  )
}

export default AccountPageLayout
