import React from 'react'

import BlogPostHomepageHorizontalCard from '@/src/components/cards/HomepageHorizontalCard'
import Wrapper from '@/src/components/styleguide/Wrapper'
import { CommonLinkProps } from '@/src/utils/getCommonLinkProps'

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

    {
      title: 'Promoted card 5 with shadow',
      linkProps: { children: 'More', href: '#' } as CommonLinkProps,
      variant: 'shadow' as const,
      imgSrc: '/bratislava-placeholder.jpg',
    },
  ]

  return (
    <Wrapper title="Homepage horizontal Card">
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
        {cards.map((blog, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <BlogPostHomepageHorizontalCard key={index} {...blog} />
        ))}
      </div>
    </Wrapper>
  )
}

export default HomepageHorizontalCardShowcase
