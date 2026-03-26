import type { NextApiRequest, NextApiResponse } from 'next'
import Rss from 'rss'

import { mockedParsedDocuments } from '@/src/services/ginis/mocks'
import { getOfficialBoardParsedList } from '@/src/services/ginis/server/getOfficialBoardParsedList'
import { shouldMockGinis } from '@/src/services/ginis/utils/shouldMockGinis'
import { base64Encode } from '@/src/utils/base64'
import { isDefined } from '@/src/utils/isDefined'

const urlPrefix = 'https://www.bratislava.sk/uradna-tabula'

const feedUrl = 'https://www.bratislava.sk/api/official-board-feed'

const description = 'Bratislava.sk - Úradná tabuľa'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (process.env.NEXT_PUBLIC_FEATURE_FLAG_RSS_FEED !== 'true') {
    res.status(404)

    return
  }

  try {
    const results = shouldMockGinis()
      ? mockedParsedDocuments
      : await getOfficialBoardParsedList({ publicationState: 'vyveseno' })

    const feed = new Rss({
      title: 'Bratislava.sk',
      description,
      site_url: 'https://www.bratislava.sk',
      feed_url: feedUrl,
      language: 'sk',
    })

    results?.filter(isDefined).forEach((boardItem) => {
      feed.item({
        title: boardItem.title,
        description: boardItem.description ?? '',
        url: boardItem.id ? `${urlPrefix}/${base64Encode(boardItem.id)}` : '',
        date: boardItem.publishedFrom,
        categories: [boardItem.categoryName],
      })
    })

    res.setHeader('Content-Type', 'text/xml')
    res.write(feed.xml())
    res.end()
  } catch {
    res.status(500).json({ message: 'Error generating RSS feed' })
  }
}

export default handler
