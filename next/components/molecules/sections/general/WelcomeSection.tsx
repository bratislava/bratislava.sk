import { HomepageHeaderFragment } from '@bratislava/strapi-sdk-homepage'
import { SectionContainer } from '@bratislava/ui-bratislava'
import { getParsedMenus } from '@bratislava/ui-bratislava/NavMenu/getParsedMenus'
import WelcomeCard from '@bratislava/ui-bratislava/WelcomeCard/WelcomeCard'
import { useGeneralContext } from '@utils/generalContext'
import cx from 'classnames'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import { useMemo, useState } from 'react'

import HomePageSearch from '../../HomePageSearch'

interface Props {
  homepageHeader: HomepageHeaderFragment | null | undefined
}

export const WelcomeSection = ({ homepageHeader }: Props) => {
  const { t } = useTranslation('common')
  const { menu } = useGeneralContext()

  const menus = useMemo(() => {
    return getParsedMenus(menu, t('navMenuMore'))
  }, [menu, t])

  const [isSearchOpen, setSearchOpen] = useState<boolean>(false)

  return (
    <div className="bg-white">
      <SectionContainer>
        <div className="relative flex flex-col py-8 lg:flex-row lg:items-center lg:py-0">
          <div className="lg:absolute z-[1] flex grow flex-col gap-8">
            {/* TODO change to font size from config */}
            <h1 className="text-h2 text-category-600 flex flex-col sm:text-[40px] font-bold sm:leading-[52px] whitespace-pre-wrap">
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
            <Image
              className="hidden sm:block"
              width={647}
              height={326}
              src={homepageHeader?.picture?.data?.attributes?.url ?? ''}
              alt=""
            />
            <Image
              className="sm:hidden"
              width={721}
              height={364}
              src={homepageHeader?.picture?.data?.attributes?.url ?? ''}
              alt=""
            />
          </div>
        </div>
        <div className="mb-5 lg:mb-14 w-full relative">
          <div className="relative md:grid md:grid-cols-3 md:gap-x-4 lg:gap-x-6 lg:grid-cols-6">
            {menus?.map((item, index) => (
              <WelcomeCard key={index} item={item} />
            ))}
          </div>
        </div>
      </SectionContainer>
    </div>
  )
}
