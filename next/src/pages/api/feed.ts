import type { NextApiRequest, NextApiResponse } from 'next'
import Rss from 'rss'

import { client } from '@/src/services/graphql/gql'
import { isDefined } from '@/src/utils/isDefined'

const urlPrefix = {
  sk: 'https://www.bratislava.sk/spravy',
  en: 'https://www.bratislava.sk/en/spravy',
}
const feedUrl = {
  sk: 'https://www.bratislava.sk/api/feed',
  en: 'https://www.bratislava.sk/api/feed?lang=en',
}
const description = {
  sk: 'Najnovšie články z bratislava.sk',
  en: 'The latest articles from bratislava.sk',
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
      description: description[language],
      site_url: 'https://www.bratislava.sk',
      feed_url: feedUrl[language],
      language,
    })

    articles?.filter(isDefined).forEach((article) => {
      feed.item({
        title: article.title,
        description: article.perex ?? '',
         
        url: article.slug ? `${urlPrefix[language]}/${article.slug}` : '',
        date: article.addedAt,
        categories: [article.tag?.title].filter(isDefined),
        enclosure: article.coverMedia
          ? {
              url: article.coverMedia.url,
              type: article.coverMedia.mime,
              size: Math.round(article.coverMedia.size * 100),
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
