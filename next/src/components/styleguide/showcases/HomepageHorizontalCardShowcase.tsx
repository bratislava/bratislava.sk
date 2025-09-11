import React from 'react'

import HomepageHorizontalCard from '@/src/components/cards/HomepageHorizontalCard'
import Wrapper from '@/src/components/styleguide/Wrapper'
import { CommonLinkProps } from '@/src/utils/getLinkProps'

const HomepageHorizontalCardShowcase = () => {
  const cards = [
    {
      title: 'Promoted card 1',
      linkProps: { children: 'More', href: '#' },
    },
    {
      title: 'Promoted card 2 with very very very very very very very very long title',
      linkProps: { children: 'More', href: '#' } as CommonLinkProps,
    },
    {
      title: 'Promoted card 3 with target blank',
      linkProps: { children: 'More', href: '#', target: '_blank' } as CommonLinkProps,
      imgSrc: '/bratislava-placeholder.jpg',
    },
  ]

  return (
    <Wrapper title="Homepage horizontal Card">
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
        {cards.map((card, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <HomepageHorizontalCard key={index} {...card} />
        ))}
      </div>
    </Wrapper>
  )
}

export default HomepageHorizontalCardShowcase
