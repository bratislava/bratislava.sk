import BlogPostCard from '@components/molecules/presentation/BlogPostCard'
import { Wrapper } from '@components/styleguide/Wrapper'
import { CommonLinkProps } from '@utils/getCommonLinkProps'
import React from 'react'

const BlogPostCardShowcase = () => {
  const cards = [
    {
      date: 'date goes here',
      title: 'Blog post 1',
      linkProps: { children: 'More', href: '#' },
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel aliquam aliquam, nunc nisl aliquam nisl, vel aliquam nisl nisl sit amet lorem. Sed euismod, nisl vel aliquam aliquam, nunc nisl aliquam nisl, vel aliquam nisl nisl sit amet lorem.',
    },
    {
      title: 'Blog post 2 with very very very very very very very very long title',
      linkProps: { children: 'More', href: '#' } as CommonLinkProps,
    },
    {
      title: 'Blog post 3 with target blank',
      linkProps: { children: 'More', href: '#', target: '_blank' } as CommonLinkProps,
      imgSrc: '/bratislava-placeholder.jpg',
    },

    {
      title: 'Blog post 5 with shadow',
      linkProps: { children: 'More', href: '#' } as CommonLinkProps,
      variant: 'shadow' as const,
      imgSrc: '/bratislava-placeholder.jpg',
    },
  ]

  return (
    <Wrapper title="BlogPost Card">
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((blog) => (
          <BlogPostCard {...blog} />
        ))}
      </div>
    </Wrapper>
  )
}

export default BlogPostCardShowcase
