import { ComponentBlocksHomepageHeader, Homepage } from '@bratislava/strapi-sdk-homepage'
import {
  BAStickyMenu,
  MenuMainItem,
  PageHeader,
  PageTitle,
  SectionContainer,
  Waves,
} from '@bratislava/ui-bratislava'
import HomepageMenu from '@bratislava/ui-bratislava/HomepageMenu/HomepageMenu'
import cx from 'classnames'
import Head from 'next/head'
import React from 'react'

import { STICKY_MENU_STATE, useWelcomeSection } from './useWelcomeSection'

interface Props {
  homepageData: Pick<Homepage, 'metaDescription' | 'title'>
  headerAttribute: Pick<
    ComponentBlocksHomepageHeader,
    'title' | 'subtitle' | 'picture' | 'mobilePicture'
  >
  mainMenuItems: MenuMainItem[]
}

export const WelcomeSection = ({
  homepageData = {},
  mainMenuItems,
  headerAttribute = {},
}: Props) => {
  const { elementRef, menuState } = useWelcomeSection()
  const { metaDescription, title } = homepageData

  return (
    <>
      <PageHeader color="" transparentColor="" imageSrc="" className="h-14 overflow-hidden">
        {/* meta description */}
        {title && metaDescription && (
          <Head>
            <title>{title}</title>
            <meta name="description" content={metaDescription} />
          </Head>
        )}
      </PageHeader>

      <div className="bg-white">
        <SectionContainer>
          <div className="lg:pt-18 flex flex-col pt-28 pb-8 sm:flex-row sm:items-center lg:pb-10">
            {headerAttribute?.title && (
              <PageTitle
                className="flex-1 pb-4"
                title={headerAttribute.title}
                subtitle={headerAttribute?.subtitle}
              />
            )}
            <img
              className="hidden sm:block"
              width={721}
              height={364}
              src={headerAttribute?.picture?.data?.attributes?.url}
              alt="Bratislava Hero"
            />
            <img
              className="sm:hidden"
              width={721}
              height={364}
              src={headerAttribute?.mobilePicture?.data?.attributes?.url}
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
        <Waves
          className="md:mt-18 mt-6"
          waveColor="white"
          wavePosition="bottom"
          isRich
          backgroundColor="var(--background-color)"
        />
      </div>
    </>
  )
}
