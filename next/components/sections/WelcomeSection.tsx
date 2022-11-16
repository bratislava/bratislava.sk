import { ComponentBlocksHomepageHeader, Homepage } from '@bratislava/strapi-sdk-homepage'
import {
  MenuMainItem,
  PageHeader,
  PageTitle,
  SectionContainer,
  Waves,
} from '@bratislava/ui-bratislava'
import HomepageMenu from '@bratislava/ui-bratislava/HomepageMenu/HomepageMenu'
import { Maybe } from 'graphql/jsutils/Maybe'
import Head from 'next/head'

interface Props {
  homepageData?: Maybe<Pick<Homepage, 'metaDescription' | 'title'>>
  headerAttribute?: Maybe<
    Pick<ComponentBlocksHomepageHeader, 'title' | 'subtitle' | 'picture' | 'mobilePicture'>
  >
  mainMenuItems: MenuMainItem[]
}

export const WelcomeSection = ({ homepageData, mainMenuItems, headerAttribute = {} }: Props) => {
  const { metaDescription, title } = homepageData ?? {}
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
          <HomepageMenu items={mainMenuItems} />
        </SectionContainer>
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
