import { ArrowLeft } from '@assets/images'
import Brand from '@bratislava/ui-bratislava/Brand/Brand'
import cx from 'classnames'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

interface IProps {
  className?: string
  currentLanguage?: string
  backButtonHidden?: boolean
}

const BackButton = () => {
  const router = useRouter()

  return (
    <>
      <ArrowLeft className="cursor-pointer mx-1" onClick={() => router.back()} />
      <div className="border-b-solid border-r-2 h-6 mx-6 hidden lg:flex" />
    </>
  )
}

export const LoginRegisterNavBar = ({ className, currentLanguage, backButtonHidden }: IProps) => {
  const languageKey = currentLanguage === 'sk' ? 'sk' : 'en'

  const { t } = useTranslation('account')
  return (
    <>
      {/* Desktop */}
      <div
        id="desktop-navbar"
        className={cx(
          className,
          'text-p2 items-center',
          'fixed top-0 left-0 w-full bg-white z-10 shadow',
        )}
      >
        <div className="max-w-screen-1.5lg m-auto hidden h-[57px] w-full items-center lg:flex">
          {!backButtonHidden && <BackButton />}
          <Brand
            className="group"
            url="/"
            title={
              <p className="text-p2 text-font group-hover:text-gray-600">
                {languageKey === 'en' && <span className="font-semibold">Bratislava </span>}
                {t('common:capitalCity')}
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
          'h-16 flex items-center py-5 px-8 -mx-8 border-b-2',
          'lg:hidden fixed top-0 w-full bg-white z-10',
        )}
      >
        {!backButtonHidden && <BackButton />}
        <Brand
          url="/"
          className="mx-auto"
          title={
            <p className="text-p2 text-font group-hover:text-gray-600">
              <span className="font-semibold">Bratislava</span>
            </p>
          }
        />
      </div>
    </>
  )
}

export default LoginRegisterNavBar
