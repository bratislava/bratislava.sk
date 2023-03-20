import { HomepageHeaderFragment } from '@bratislava/strapi-sdk-homepage'
import { MenuMainItem, SectionContainer } from '@bratislava/ui-bratislava'
import HomepageMenu from '@bratislava/ui-bratislava/HomepageMenu/HomepageMenu'
import cx from 'classnames'
import Image from 'next/image'
import { MutableRefObject, useState } from 'react'

import HomePageSearch from '../molecules/HomePageSearch'
import { STICKY_MENU_STATE, useWithoutStickyMenuSection } from './useWithoutStickyMenuSection'

interface Props {
  homepageHeader: HomepageHeaderFragment | null | undefined
  mainMenuItems: MenuMainItem[]
  elementRef: MutableRefObject<HTMLDivElement | null>
}

export const WithoutStickyMenuSection = ({ mainMenuItems, homepageHeader, elementRef }: Props) => {
  const [isSearchOpen, setSearchOpen] = useState<boolean>(false)
  const { menuState } = useWithoutStickyMenuSection()

  return (
    <div ref={elementRef}>
      <SectionContainer>
        <div className="relative flex flex-col pt-28 pb-8 lg:flex-row lg:items-center lg:pb-10 lg:pt-18">
          <div className="lg:absolute z-[1] flex grow flex-col gap-8">
            {/* TODO change to font size from config */}
            <h1 className="text-h3 text-category-600 flex flex-col sm:text-[40px] font-bold sm:leading-[52px] whitespace-pre-wrap">
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
              alt="Bratislava Hero"
            />
            <Image
              className="sm:hidden"
              width={721}
              height={364}
              src={homepageHeader?.picture?.data?.attributes?.url ?? ''}
              alt="Bratislava Hero"
            />
            {/* <img */}
            {/*  className="hidden sm:block" */}

            {/*  alt="Bratislava Hero" */}
            {/* /> */}
            {/* <img */}
            {/*  className="sm:hidden" */}
            {/*  width={721} */}
            {/*  height={364} */}
            {/*  src={homepageHeader?.mobilePicture?.data?.attributes?.url} */}
            {/*  alt="Bratislava Hero" */}
            {/* /> */}
          </div>
        </div>
        <div className="mb-[20rem] md:mb-0 h-36 w-full relative">
          <div className="relative">
            <HomepageMenu
              items={mainMenuItems}
              isVisible={menuState === STICKY_MENU_STATE.HIDDEN}
            />
          </div>
        </div>
      </SectionContainer>
    </div>
  )
}
