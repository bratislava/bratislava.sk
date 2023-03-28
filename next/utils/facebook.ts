interface FetchFacebookPostsOptions {
  after?: string
}

interface FacebookPost {
  id: string
  full_picture?: string
  permalink_url: string
}

export interface FetchFacebookPostsResult {
  posts: {
    id: string
    full_picture: string
    permalink_url: string
  }[]
  nextPage?: string
}

const hasFullPicture = (
  post: FacebookPost,
): post is { [K in keyof FacebookPost]-?: FacebookPost[K] } => {
  return post.full_picture !== undefined
}

export const fetchFacebookPosts = async (
  opts?: FetchFacebookPostsOptions,
): Promise<FetchFacebookPostsResult> => {
  const page = process.env.FB_PAGE
  const access_token = process.env.FB_ACCESS_TOKEN

  if (!page || !access_token) return { posts: [] }

  const params = [
    ['access_token', access_token],
    ['fields', 'full_picture,id,permalink_url'],
    ['limit', 25],
    ['after', opts?.after],
  ]

  const result = await fetch(
    `https://graph.facebook.com/v12.0/${page}/posts?${params
      .filter((p) => !!p[1])
      .map((p) => p.join('='))
      .join('&')}`,
  )

  const resultData = await result.json()

  if (resultData.error) {
    const error = new Error(resultData.error.message)
    console.error(error)

    return {
      posts: [],
    }
  }

  const resultPosts = resultData.data as FacebookPost[]

  return {
    posts: resultPosts.filter(hasFullPicture),
    nextPage: resultData.paging.cursors.after,
  }
}
