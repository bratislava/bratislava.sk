import { ArrowLeft } from '@assets/images'
import cx from 'classnames'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

import { Brand } from '../Brand/Brand'

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

export const AccountNavBar = ({ className, currentLanguage }: IProps) => {
  const languageKey = currentLanguage === 'sk' ? 'sk' : 'en'

  const { t } = useTranslation(['common'])
  return (
    <>
      {/* Desktop */}
      <div
        id="desktop-navbar"
        className={cx(
          className,
          'text-p2 items-center ',
          'fixed top-0 left-0 w-full bg-white z-50',
        )}
      >
        <div className="max-w-screen-1.5lg m-auto hidden h-[57px] w-full items-center border-b border-gray-200 lg:flex">
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
