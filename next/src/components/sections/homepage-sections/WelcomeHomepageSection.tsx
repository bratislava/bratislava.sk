import { Typography } from '@bratislava/component-library'
import Image from 'next/image'
import { useMemo, useState } from 'react'

import WelcomeCard from '@/src/components/cards/WelcomeCard/WelcomeCard'
import HomePageSearch from '@/src/components/common/HomepageSearch/HomePageSearch'
import { getParsedMenus } from '@/src/components/common/NavBar/NavMenu/getParsedMenus'
import SectionContainer from '@/src/components/common/SectionContainer/SectionContainer'
import { useGeneralContext } from '@/src/components/providers/GeneralContextProvider'
import { useHomepageContext } from '@/src/components/providers/HomepageContextProvider'
import cn from '@/src/utils/cn'
import { generateImageSizes } from '@/src/utils/generateImageSizes'
import { useTranslation } from '@/src/utils/useTranslation'

const WelcomeHomepageSection = () => {
  const { t } = useTranslation()
  const { menu } = useGeneralContext()
  const { homepage } = useHomepageContext()

  const { welcomeHeadline, welcomeMedia } = homepage?.attributes ?? {}

  const menus = useMemo(() => {
    return getParsedMenus(menu, t('NavMenu.more'))
  }, [menu, t])

  const [isSearchOpen, setSearchOpen] = useState<boolean>(false)

  return (
    <SectionContainer className="bg-white">
      <div className="relative flex flex-col gap-y-4 py-8 lg:flex-row lg:items-center lg:py-0">
        <div className="z-[1] flex grow flex-col gap-8 lg:absolute">
          <Typography type="h1" className="whitespace-pre-wrap text-category-600">
            {welcomeHeadline}
          </Typography>

          <HomePageSearch isOpen={isSearchOpen} setOpen={setSearchOpen} />
        </div>
        <div
          className={cn(
            'relative mx-auto h-[180px] w-full transition-all duration-300 sm:h-[200px] md:h-[378px] lg:ml-auto lg:mr-0 lg:w-[50%]',
            {
              'lg:opacity-25': isSearchOpen,
            },
          )}
        >
          <Image
            src={welcomeMedia?.data?.attributes?.url ?? ''}
            alt=""
            priority
            quality={100}
            sizes={generateImageSizes({ default: '100vw', sm: '647px' })}
            fill
            className="object-contain"
          />
        </div>
      </div>
      <div className="relative mb-5 w-full lg:mb-14">
        <div className="relative md:grid md:grid-cols-3 md:gap-x-4 lg:grid-cols-6 lg:gap-x-6">
          {menus?.map((item, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <WelcomeCard key={index} item={item} />
          ))}
        </div>
      </div>
    </SectionContainer>
  )
}

export default WelcomeHomepageSection
