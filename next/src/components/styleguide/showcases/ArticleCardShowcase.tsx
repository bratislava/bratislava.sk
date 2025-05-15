import React from 'react'

import ArticleCard from '@/src/components/cards/ArticleCard'
import Wrapper from '@/src/components/styleguide/Wrapper'
import { CommonLinkProps } from '@/src/utils/getLinkProps'

const ArticleCardShowcase = () => {
  const cards = [
    {
      date: 'date goes here',
      title: 'Article 1',
      linkProps: { children: 'More', href: '#' },
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel aliquam aliquam, nunc nisl aliquam nisl, vel aliquam nisl nisl sit amet lorem. Sed euismod, nisl vel aliquam aliquam, nunc nisl aliquam nisl, vel aliquam nisl nisl sit amet lorem.',
    },
    {
      title: 'Article 2 with very very very very very very very very long title',
      linkProps: { children: 'More', href: '#' } as CommonLinkProps,
    },
    {
      title: 'Article 3 with target blank',
      linkProps: { children: 'More', href: '#', target: '_blank' } as CommonLinkProps,
      imgSrc: '/bratislava-placeholder.jpg',
    },

    {
      title: 'Article 5 with no border',
      linkProps: { children: 'More', href: '#' } as CommonLinkProps,
      variant: 'no-border' as const,
      imgSrc: '/bratislava-placeholder.jpg',
    },
  ]

  return (
    <Wrapper title="Article Card">
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((blog, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <ArticleCard key={index} {...blog} />
        ))}
      </div>
    </Wrapper>
  )
}

export default ArticleCardShowcase
