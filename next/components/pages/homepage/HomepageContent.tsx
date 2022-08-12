import { LatestBlogsFragment } from '@bratislava/strapi-sdk-homepage'
import {
  BlogCards,
  InBaCard,
  Posts,
  PrimatorCouncil,
  SectionContainer,
  TPostsTab,
  Waves,
} from '@bratislava/ui-bratislava'
import { InBaProps } from '@bratislava/ui-bratislava/InBaCard/types'
import { MostSearchedServices } from '@bratislava/ui-bratislava/most-searched-services/MostSearchedServices'
import { DataProps } from '@utils/homepage-mockdata'
import { useTranslation } from 'next-i18next'
import * as React from 'react'
import { FC } from 'react'

import { ParsedOfficialBoardDocument } from '../../../services/ginis'
import FacebookPosts from '../../molecules/sections/homepage/FacebookPosts'
import GooutEvents from '../../molecules/sections/homepage/GooutEvents'
import { BlogPost, Homepage } from './types'

interface Props {
  homepagePosts: BlogPost[]
  posts?: TPostsTab[]
  rozkoPosts?: unknown
  latestBlogposts?: LatestBlogsFragment
  inBaProps: InBaProps
  homepage?: Homepage
  data: DataProps
}

export const HomepageContent: FC<Props> = ({
  homepagePosts,
  posts,
  rozkoPosts,
  latestBlogposts,
  inBaProps,
  homepage,
  data,
}) => {
  const { t } = useTranslation('common')
  return (
    <div className="mt-73">
      <SectionContainer>
        <BlogCards className="mb-0 lg:mb-24" posts={homepagePosts} shiftIndex={1} />
        <Posts
          readMoreText={t('readMore')}
          readMoreNewsText={t('seeAllNews')}
          className="lg:mt-10"
          leftHighLight={homepage?.data?.attributes?.left_highlight}
          rightHighLight={homepage?.data?.attributes?.right_highlight}
          posts={posts}
          latestPost={latestBlogposts}
          rozkoPosts={rozkoPosts}
        />
        <PrimatorCouncil className="mt-14 lg:mt-24" primatorCards={data.council.cards} />

        <GooutEvents
          linkTitle={t('allEvents')}
          linkUrl={t('goOutEventsLink')}
          title={t('upComingEvents')}
          className="mt-14 lg:mt-24"
        />
      </SectionContainer>
      <Waves
        className="mt-20 mb-[-1px] lg:mb-0"
        backgroundColor="var(--background-color)"
        waveColor="var(--secondary-color)"
        wavePosition="top"
        isRich
      />
      <MostSearchedServices topNine={data.topNine} topNineTitle={data.topNineTitle} />
      <Waves
        waveColor="var(--secondary-color)"
        backgroundColor="var(--background-color)"
        wavePosition="bottom"
        isRich
        className="mt-[-1px] lg:mt-0"
      />

      <SectionContainer>
        <InBaCard className="mx-auto mt-56 min-h-[200px] max-w-3xl" {...inBaProps} />
        <div className="hidden md:block md:h-[78px]" />

        <FacebookPosts title="Bratislava na Facebooku" />
        {/* TODO : commented newsletter for this release probabbly on future release we will uncomment */}
        {/* <NewsLetterSection className="mt-24" /> */}
      </SectionContainer>
    </div>
  )
}
