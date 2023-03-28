import NewsImage from '@assets/images/sample-news-image.jpeg'
import NewsImage2 from '@assets/images/sample-news-image-2.jpeg'

// NewsImage can be loaded as {src: '...'} or '...', depending on configuration (next vs storybook)
const img1 = NewsImage as any
const img2 = NewsImage2 as any

const SAMPLE_RELATED_CONTENT = [
  {
    imageSrc: img1.src ?? img1,
    tag: 'Lorem ipsum',
    title: 'Nadpis lorem ipsum dolor sit',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit massa morbi tristique sit mi, faucibus.',
  },
  {
    imageSrc: img2.src ?? img1,
    tag: 'Lorem ipsum',
    title: 'Nadpis lorem ipsum dolor sit',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit massa morbi tristique sit mi, faucibus.',
  },
  {
    imageSrc: img1.src ?? img1,
    tag: 'Lorem ipsum',
    title: 'Nadpis lorem ipsum dolor sit',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit massa morbi tristique sit mi, faucibus.',
  },
]

export default SAMPLE_RELATED_CONTENT
