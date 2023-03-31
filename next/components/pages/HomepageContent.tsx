import PageLayout from '@components/layouts/PageLayout'
import BookmarksHomepageSection from '@components/molecules/sections/homepage/BookmarksHomepageSection'
import GooutEventsHomepageSection from '@components/molecules/sections/homepage/GooutEventsHomepageSection'
import { WelcomeHomepageSection } from '@components/molecules/sections/homepage/WelcomeHomepageSection'
import {
  BlogCards,
  Bookmarks,
  InBaCard,
  Posts,
  PrimatorCouncil,
  SectionContainer,
  TopNine,
  Waves,
} from '@components/ui'
import { TopNineItemProps } from '@components/ui/TopNineItem/TopNineItem'
import { useHomepageContext } from '@utils/homepageContext'
import React from 'react'

const HomepageContent = () => {
  const homepage = useHomepageContext()

  return (
    <PageLayout>
      <BookmarksHomepageSection />
      <WelcomeHomepageSection />
      <Waves waveColor="var(--background-color)" wavePosition="top" />

      <Waves wavePosition="bottom" waveColor="var(--background-color)" />
      <SectionContainer>
        <GooutEventsHomepageSection
          linkTitle={t('allEvents')}
          linkUrl="https://www.bkis.sk/podujatia/"
          title={t('upComingEvents')}
          className="mt-14"
        />
      </SectionContainer>

      <Waves waveColor="rgb(var(--color-category-200))" wavePosition="top" />

      <SectionContainer className="relative bg-category-200 py-8">
        <h2 className="text-h1 pb-10 text-center xs:mt-8 lg:pb-20">{data.topNineTitle}</h2>
        <TopNine items={data.topNine as TopNineItemProps[]} />
      </SectionContainer>

      <Waves waveColor="rgb(var(--color-category-200))" wavePosition="bottom" />

      <SectionContainer>
        <InBaCard className="mx-auto mt-40 min-h-[200px] max-w-3xl md:mt-28" {...inba} />
        <div className="hidden md:block md:h-20" />
      </SectionContainer>
    </PageLayout>
  )
}

export default HomepageContent
