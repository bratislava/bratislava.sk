import { SectionContainer } from '@bratislava/ui-bratislava'
import WelcomeCard from '@components/ui/WelcomeCard/WelcomeCard'
import { useGeneralContext } from '@utils/generalContext'
import { generateImageSizes } from '@utils/generateImageSizes'
import { useHomepageContext } from '@utils/homepageContext'
import cx from 'classnames'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import { useMemo, useState } from 'react'

import { getParsedMenus } from '../../../organisms/NavBar/NavMenu/getParsedMenus'
import HomePageSearch from '../../HomePageSearch'

export const WelcomeHomepageSection = () => {
  const { t } = useTranslation('common')
  const { menu } = useGeneralContext()
  const { homepage } = useHomepageContext()

  const homepageHeader = homepage?.attributes?.header

  const menus = useMemo(() => {
    return getParsedMenus(menu, t('NavMenu.more'))
  }, [menu, t])

  const [isSearchOpen, setSearchOpen] = useState<boolean>(false)

  return (
    <div className="bg-white">
      <SectionContainer>
        <div className="relative flex flex-col py-8 lg:flex-row lg:items-center lg:py-0">
          <div className="z-[1] flex grow flex-col gap-8 lg:absolute">
            {/* TODO change to font size from config */}
            <h1 className="text-h2 flex flex-col whitespace-pre-wrap font-bold text-category-600 sm:text-[40px] sm:leading-[52px]">
              {homepageHeader?.headline}
            </h1>
            <HomePageSearch isOpen={isSearchOpen} setOpen={setSearchOpen} />
          </div>
          <div
            className={cx(
              'mx-auto transition-all duration-300 lg:ml-auto lg:mr-0 lg:w-[50%] xl:w-auto',
              {
                'lg:opacity-25': isSearchOpen,
              },
            )}
          >
            <div className="w-full max-w-[721px] sm:max-w-[647px]">
              <Image
                width={homepageHeader?.picture?.data?.attributes?.width ?? undefined}
                height={homepageHeader?.picture?.data?.attributes?.height ?? undefined}
                src={homepageHeader?.picture?.data?.attributes?.url ?? ''}
                alt=""
                priority
                quality={100}
                sizes={generateImageSizes({ default: '100vw', sm: '647px' })}
              />
            </div>
          </div>
        </div>
        <div className="relative mb-5 w-full lg:mb-14">
          <div className="relative md:grid md:grid-cols-3 md:gap-x-4 lg:grid-cols-6 lg:gap-x-6">
            {menus?.map((item, index) => (
              <WelcomeCard key={index} item={item} />
            ))}
          </div>
        </div>
      </SectionContainer>
    </div>
  )
}
