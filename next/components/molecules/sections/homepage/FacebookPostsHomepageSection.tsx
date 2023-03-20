import { ImagesCarousel, TImageCarouselItem } from '@bratislava/ui-bratislava'
import { FetchFacebookPostsResult } from '@utils/facebook'
import React from 'react'

interface IProps {
  title: string
}

const fetchFBPosts = async () => {
  const res = await fetch('/api/facebook-posts')
  const data: FetchFacebookPostsResult = await res.json()
  return data.posts.map((post, i) => ({
    id: post.id,
    mainImage: { id: i.toString(), src: post.full_picture },
    url: post.permalink_url,
  }))
}

const FacebookPostsHomepageSection = ({ title }: IProps) => {
  const [posts, setFBPosts] = React.useState<TImageCarouselItem[]>([])

  React.useEffect(() => {
    fetchFBPosts()
      .then(setFBPosts)
      .catch((error) => console.log(error))
  }, [])

  if (posts.length === 0) return null

  return <ImagesCarousel className="mt-44" title={title} items={posts} shiftIndex={3} />
}

export default FacebookPostsHomepageSection
