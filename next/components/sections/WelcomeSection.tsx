import { HomepageHeaderFragment } from '@bratislava/strapi-sdk-homepage'
import { BAStickyMenu, MenuMainItem, SectionContainer } from '@bratislava/ui-bratislava'
import HomepageMenu from '@bratislava/ui-bratislava/HomepageMenu/HomepageMenu'
import cx from 'classnames'
import { useState } from 'react'

import HomePageSearch from '../molecules/HomePageSearch'
import { STICKY_MENU_STATE, useWelcomeSection } from './useWelcomeSection'

interface Props {
  homepageHeader: HomepageHeaderFragment | null | undefined
  mainMenuItems: MenuMainItem[]
}

export const WelcomeSection = ({ mainMenuItems, homepageHeader }: Props) => {
  const [isSearchOpen, setSearchOpen] = useState<boolean>(false)
  const { elementRef, menuState } = useWelcomeSection()

  return (
    <>
      <SectionContainer>
        <div className="lg:pt-18 flex flex-col pt-28 pb-8 sm:flex-row sm:items-center lg:pb-10">
          <div className="lg:absolute z-[1] flex grow flex-col gap-8">
            {/* TODO change to font size from config */}
            <h1 className="text-h3 text-category-600 flex flex-col sm:text-[40px] font-bold sm:leading-[52px] whitespace-pre-wrap">
              {homepageHeader?.headline}
            </h1>
            <HomePageSearch isOpen={isSearchOpen} setOpen={setSearchOpen} />
          </div>
          <img
            className="hidden sm:block"
            width={721}
            height={364}
            src={homepageHeader?.picture?.data?.attributes?.url}
            alt="Bratislava Hero"
          />
          <img
            className="sm:hidden"
            width={721}
            height={364}
            src={homepageHeader?.mobilePicture?.data?.attributes?.url}
            alt="Bratislava Hero"
          />
        </div>
        <div className="h-36 w-full relative">
          <div
            className={cx('mx-auto w-full bg-white fixed z-40 drop-shadow-sm shadow-lg left-0', {
              'top-14 md:block transition-all duration-500':
                menuState === STICKY_MENU_STATE.VISIBLE,
              '-top-14 transition-all duration-500': menuState === STICKY_MENU_STATE.HIDDEN,
            })}
          >
            <BAStickyMenu menuItems={mainMenuItems} />
          </div>
          <div className="relative block">
            <HomepageMenu items={mainMenuItems} />
          </div>
        </div>
      </SectionContainer>
      <div ref={elementRef} className="w-max h-2 md:block hidden" />
    </>
  )
}
