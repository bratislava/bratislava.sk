import { ArrowLeft } from '@assets/images'
import Brand from '@bratislava/ui-bratislava/Brand/Brand'
import cx from 'classnames'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { Dispatch, ReactNode, SetStateAction } from 'react'

interface SectionItemBase {
  id: number
  title: string
  icon: ReactNode
}

interface IProps {
  className?: string
  currentLanguage?: string
  sectionsList?: SectionItemBase[]
  activeSection?: number
  setActiveSection?: Dispatch<SetStateAction<number>>
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
// test const, need to get from useAccount
const isLogin = true

export const AccountNavBar = ({
  className,
  currentLanguage,
  sectionsList,
  activeSection,
  setActiveSection,
}: IProps) => {
  const languageKey = currentLanguage === 'sk' ? 'sk' : 'en'
  // const [activeSection, setActiveSection] = useState(0)

  const { t } = useTranslation(['common'])
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
        {isLogin && (
          <div className="border-t border-gray-200 max-w-screen-1.5lg m-auto h-[57px] w-full items-center justify-between lg:flex">
            <ul className="w-full h-full flex items-center">
              {sectionsList.map((sectionItem) => (
                // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
                <li
                  className={cx(
                    'text-p2-semibold w-full h-full flex items-center justify-center cursor-pointer border-b-2 border-transparent hover:text-main-700 hover:border-main-700 transition-all',
                    { 'text-main-700 border-main-700': activeSection === sectionItem.id },
                  )}
                  key={sectionItem.id}
                  onClick={() => setActiveSection(sectionItem.id)}
                >
                  {sectionItem.icon}
                  <span className="ml-3">{sectionItem.title}</span>
                </li>
              ))}
            </ul>
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
