import * as React from 'react'
import { BlogCards as UIBlogCards } from '@bratislava/ui-bratislava'

import NewsImage from '@assets/images/sample-news-image.jpeg'
import NewsImage2 from '@assets/images/sample-news-image-2.jpeg'

const sample = [
  {
    imageSrc: NewsImage,
    title: 'Verejný priestor na Kazanskej ulici vo Vrakuni sa dočká obnovy',
    url: '/',
  },
  {
    imageSrc: NewsImage2,
    title: 'Nový bytový súbor s nájomnými bytmi na Terchovskej ulici',
    url: '/',
  },
  {
    imageSrc: NewsImage,
    title: 'Nový3 bytový súbor s nájomnými bytmi na Terchovskej ulici',
    url: '/',
  },
  {
    imageSrc: NewsImage,
    title: 'Nový bytový súbor s nájomnými bytmi na Terchovskej ulici',
    url: '/',
  },
  {
    imageSrc: NewsImage,
    title: 'Nový bytový súbor s nájomnými bytmi na Terchovskej ulici',
    url: '/',
  },
  {
    imageSrc: NewsImage2,
    title: 'Nový bytový súbor s nájomnými bytmi na Terchovskej ulici',
    url: '/',
  },
  {
    imageSrc: NewsImage,
    title: 'Nový bytový súbor s nájomnými bytmi na Terchovskej ulici',
    url: '/',
  },
]

const BlogCards = () => <UIBlogCards posts={sample} />

export default BlogCards
