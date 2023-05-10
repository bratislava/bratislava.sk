import { client } from '@utils/gql'
import { isDefined } from '@utils/isDefined'
import type { NextApiRequest, NextApiResponse } from 'next'
import Rss from 'rss'

const urlPrefix = { sk: 'https://www.bratislava.sk/blog', en: 'https://www.bratislava.sk/en/blog' }
const feedUrl = {
  sk: 'https://www.bratislava.sk/feed',
  en: 'https://www.bratislava.sk/feed?lang=en',
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (process.env.NEXT_PUBLIC_FEATURE_FLAG_RSS_FEED !== 'true') {
    res.status(404)
    return
  }

  try {
    const language = req.query.lang ?? 'sk'

    if (language !== 'sk' && language !== 'en') {
      throw new Error('Invalid language')
    }

    const { blogPosts } = await client.BlogPostsRssFeed({ locale: language })

    const feed = new Rss({
      title: 'Bratislava.sk',
      description: 'The latest blog posts from Bratislava.sk',
      site_url: 'https://www.bratislava.sk',
      feed_url: feedUrl[language],
      language,
    })

    blogPosts?.data?.filter(isDefined).forEach((post) => {
      if (!post.attributes) {
        return
      }

      feed.item({
        title: post.attributes.title ?? '',
        description: post.attributes.excerpt ?? '',
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        url: post.attributes.slug ? `${urlPrefix[language]}/${post.attributes.slug}` : '',
        date: post.attributes.date_added ?? post.attributes.publishedAt,
        categories: [
          post.attributes.tag?.data?.attributes?.pageCategory?.data?.attributes?.title,
          post.attributes.tag?.data?.attributes?.title,
        ].filter(isDefined),
        enclosure: post.attributes.coverImage?.data?.attributes
          ? {
              url: post.attributes.coverImage.data.attributes.url,
              type: post.attributes.coverImage.data.attributes.mime,
              size: Math.round(post.attributes.coverImage.data.attributes.size * 100),
            }
          : undefined,
      })
    })

    res.setHeader('Content-Type', 'text/xml')
    res.write(feed.xml())
    res.end()
  } catch (error) {
    res.status(500).json({ message: 'Error generating RSS feed' })
  }
}

export default handler
