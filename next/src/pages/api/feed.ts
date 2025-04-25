import type { NextApiRequest, NextApiResponse } from 'next'
import Rss from 'rss'

import { client } from '@/src/services/graphql/gql'
import { isDefined } from '@/src/utils/isDefined'

const urlPrefix = {
  sk: 'https://www.bratislava.sk/spravy',
  en: 'https://www.bratislava.sk/en/spravy',
}
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

    const { articles } = await client.ArticlesRssFeed({ locale: language })

    const feed = new Rss({
      title: 'Bratislava.sk',
      description: 'The latest articles from Bratislava.sk',
      site_url: 'https://www.bratislava.sk',
      feed_url: feedUrl[language],
      language,
    })

    articles?.data?.filter(isDefined).forEach((article) => {
      if (!article.attributes) {
        return
      }

      feed.item({
        title: article.attributes.title ?? '',
        description: article.attributes.perex ?? '',
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        url: article.attributes.slug ? `${urlPrefix[language]}/${article.attributes.slug}` : '',
        date: article.attributes.addedAt,
        categories: [
          article.attributes.tag?.data?.attributes?.pageCategory?.data?.attributes?.title,
          article.attributes.tag?.data?.attributes?.title,
        ].filter(isDefined),
        enclosure: article.attributes.coverMedia?.data?.attributes
          ? {
              url: article.attributes.coverMedia.data.attributes.url,
              type: article.attributes.coverMedia.data.attributes.mime,
              size: Math.round(article.attributes.coverMedia.data.attributes.size * 100),
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
