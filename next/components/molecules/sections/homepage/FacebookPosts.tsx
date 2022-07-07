import { ImagesCarousel, TImageCarouselItem } from '@bratislava/ui-bratislava'
import React from 'react'

import { FetchFacebookPostsResult } from '../../../../utils/facebook'

interface IProps {
  title: string
}

const FacebookPosts = ({ title }: IProps) => {
  const [posts, setFBPosts] = React.useState<TImageCarouselItem[]>([])

  React.useEffect(() => {
    fetchFBPosts().then(setFBPosts)
  }, [])

  if (posts.length === 0) return null

  return <ImagesCarousel className="mt-44" title={title} items={posts} shiftIndex={3} />
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

export default FacebookPosts
