import type { NextApiRequest, NextApiResponse } from 'next'

import { mockedParsedCategories } from '@/src/services/ginis/mocks'
import { getOfficialBoardParsedCategories } from '@/src/services/ginis/server/getOfficialBoardParsedCategories'
import {
  OfficialBoardCategoryListResponse,
  ParsedOfficialBoardCategory,
} from '@/src/services/ginis/types'
import { shouldMockGinis } from '@/src/services/ginis/utils/shouldMockGinis'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<OfficialBoardCategoryListResponse>,
): Promise<void> => {
  let result: ParsedOfficialBoardCategory[] = []

  try {
    result = shouldMockGinis() ? mockedParsedCategories : await getOfficialBoardParsedCategories()
  } catch (error) {
    // TODO handle error
    // eslint-disable-next-line no-console
    console.log(error)
  }

  return res.json(result)
}

export default handler
