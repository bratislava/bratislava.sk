import { ArrowLeft } from '@assets/images'
import BusinessIcon from '@assets/images/account/business-icon.svg'
import HelpIcon from '@assets/images/account/help-icon.svg'
import HomeIcon from '@assets/images/account/home-icon.svg'
import PaymentIcon from '@assets/images/account/payment-icon.svg'
import Brand from '@bratislava/ui-bratislava/Brand/Brand'
import cx from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { ReactNode } from 'react'

interface IProps {
  className?: string
  currentLanguage?: string
}

const BackButton = () => {
  const router = useRouter()

  return (
    <>
      <ArrowLeft className="cursor-pointer" onClick={() => router.back()} />
      <div className="border-b-solid border-r-2 h-6 ml-7 mr-6" />
    </>
  )
}
// TODO test const, need to get from useAccount
const isLogin = true

interface SectionItemBase {
  id: number
  title: string
  icon: ReactNode
  link: string
}

export const AccountNavBar = ({ className, currentLanguage }: IProps) => {
  const languageKey = currentLanguage === 'sk' ? 'sk' : 'en'

  const { t } = useTranslation('common')
  const { t: t2 } = useTranslation('account')
  const router = useRouter()

  const sectionsList: SectionItemBase[] = [
    { id: 0, title: t2('account_section_intro'), icon: <HomeIcon />, link: '/intro' },
    {
      id: 1,
      title: t2('account_section_services'),
      icon: <BusinessIcon />,
      link: '/municipal-services',
    },
    {
      id: 2,
      title: t2('account_section_payment', { joinArrays: 'account' }),
      icon: <PaymentIcon />,
      link: '/taxes-and-fees',
    },
    { id: 3, title: t2('account_section_help'), icon: <HelpIcon />, link: '/i-have-a-problem' },
  ]
  return (
    <>
      {/* Desktop */}
      <div
        id="desktop-navbar"
        className={cx(
          className,
          'text-p2 items-center',
          'fixed top-0 left-0 w-full bg-white z-50 shadow',
        )}
      >
        <div className="max-w-screen-1.5lg m-auto hidden h-[57px] w-full items-center lg:flex">
          <BackButton />
          <Brand
            className="group"
            url="/"
            title={
              <p className="text-p2 text-font group-hover:text-gray-600">
                {languageKey === 'en' && <span className="font-semibold">Bratislava </span>}
                {t('capitalCity')}
                {languageKey !== 'en' && <span className="font-semibold"> Bratislava</span>}
              </p>
            }
          />
        </div>
        {isLogin && sectionsList && (
          <div className="border-t border-gray-200 max-w-screen-1.5lg m-auto h-[57px] w-full items-center justify-between lg:flex">
            <div className="w-full h-full flex items-center">
              {sectionsList?.map((sectionItem) => (
                <Link key={sectionItem.id} href={`/account${sectionItem.link}`}>
                  <span
                    className={cx(
                      'text-p2-semibold w-full h-full flex items-center justify-center cursor-pointer border-b-2 border-transparent hover:text-main-700 hover:border-main-700 transition-all',
                      {
                        'text-main-700 border-main-700': router.route.includes(sectionItem?.link),
                      },
                    )}
                  >
                    {sectionItem.icon}
                    <span className="ml-3">{sectionItem?.title}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Mobile */}
      <div
        id="mobile-navbar"
        className={cx(
          className,
          'h-16 flex items-center py-5 px-8 -mx-8 shadow-md drop-shadow-md',
          'lg:hidden fixed top-0 w-full bg-white z-50',
        )}
      >
        <BackButton />
        <Brand url="/" />
      </div>
    </>
  )
}

export default AccountNavBar
