import { Typography } from '@bratislava/component-library'
import Image from 'next/image'
import { useMemo, useState } from 'react'

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
      <div className="relative flex flex-col gap-y-4 py-8 lg:flex-row lg:items-center lg:py-14">
        <div className="z-[1] flex grow flex-col gap-8 lg:absolute">
          <Typography type="h1" className="whitespace-pre-wrap">
            {welcomeHeadline}
          </Typography>

          <HomePageSearch isOpen={isSearchOpen} setOpen={setSearchOpen} />
        </div>
        <div
          className={cn(
            'relative mx-auto h-[240px] w-full transition-all duration-300 sm:h-[300px] md:h-[378px] lg:ml-auto lg:mr-0 lg:w-[50%]',
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
    </SectionContainer>
  )
}

export default WelcomeHomepageSection
