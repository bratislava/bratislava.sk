import * as React from 'react';
import { BlogCards as UIBlogCards } from '@bratislava/ui-bratislava';

import NewsImage from '@bratislava/ui-bratislava/assets/images/sample-news-image.jpeg';
import NewsImage2 from '@bratislava/ui-bratislava/assets/images/sample-news-image-2.jpeg';

const sample = [
  {
    imageSrc: NewsImage.src,
    title: 'Verejný priestor na Kazanskej ulici vo Vrakuni sa dočká obnovy',
    url: '/',
  },
  {
    imageSrc: NewsImage2.src,
    title: 'Nový bytový súbor s nájomnými bytmi na Terchovskej ulici',
    url: '/',
  },
  {
    imageSrc: NewsImage.src,
    title: 'Nový3 bytový súbor s nájomnými bytmi na Terchovskej ulici',
    url: '/',
  },
  {
    imageSrc: NewsImage.src,
    title: 'Nový bytový súbor s nájomnými bytmi na Terchovskej ulici',
    url: '/',
  },
  {
    imageSrc: NewsImage.src,
    title: 'Nový bytový súbor s nájomnými bytmi na Terchovskej ulici',
    url: '/',
  },
  {
    imageSrc: NewsImage2.src,
    title: 'Nový bytový súbor s nájomnými bytmi na Terchovskej ulici',
    url: '/',
  },
  {
    imageSrc: NewsImage.src,
    title: 'Nový bytový súbor s nájomnými bytmi na Terchovskej ulici',
    url: '/',
  },
];

const BlogCards = () => <UIBlogCards posts={sample} />;

export default BlogCards;
