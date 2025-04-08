import React from 'react'

import CategoryCard from '@/src/components/cards/CategoryCard'
import Wrapper from '@/src/components/styleguide/Wrapper'
import { CommonLinkProps } from '@/src/utils/getCommonLinkProps'

const CategoryCardShowcase = () => {
  const cards = [
    { title: 'Category 1', linkProps: { children: 'More', href: '#' } },
    {
      title: 'Category 2 with very very very very very very very very long title',
      linkProps: { children: 'More', href: '#' } as CommonLinkProps,
    },
    {
      title: 'Category 3 with target blank',
      linkProps: { children: 'More', href: '#', target: '_blank' } as CommonLinkProps,
    },

    {
      title: 'Category 5 with no border',
      linkProps: { children: 'More', href: '#' } as CommonLinkProps,
      variant: 'no-border' as const,
    },
  ]

  return (
    <Wrapper title="Category Card">
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cards.map(({ title, linkProps, variant }, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <CategoryCard key={index} title={title} linkProps={linkProps} variant={variant} />
        ))}
      </div>
    </Wrapper>
  )
}

export default CategoryCardShowcase
