import { SectionContainer, TopNine } from '@bratislava/ui-bratislava'
import { TopNineItemProps } from '@bratislava/ui-bratislava/TopNineItem/TopNineItem'
import * as React from 'react'
import { FC } from 'react'

interface Props {
  topNineTitle?: string
  topNine: TopNineItemProps[]
}

export const MostSearchedServices: FC<Props> = ({ topNine, topNineTitle }) => (
  <SectionContainer className="bg-secondary py-16">
    <h2 className="pb-10 text-center text-default font-semibold xs:mt-8 lg:pb-20 lg:text-2xl">{topNineTitle}</h2>
    <TopNine items={topNine} />
  </SectionContainer>
)
