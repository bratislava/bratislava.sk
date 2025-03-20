import type { NextApiRequest, NextApiResponse } from 'next'

import { mockedParsedCategories } from '@/services/ginis/mocks'
import { getOfficialBoardParsedCategories } from '@/services/ginis/server/getOfficialBoardParsedCategories'
import {
  OfficialBoardCategoryListResponse,
  ParsedOfficialBoardCategory,
} from '@/services/ginis/types'
import { shouldMockGinis } from '@/services/ginis/utils/shouldMockGinis'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<OfficialBoardCategoryListResponse>,
): Promise<void> => {
  let result: ParsedOfficialBoardCategory[] = []

  try {
    result = shouldMockGinis() ? mockedParsedCategories : await getOfficialBoardParsedCategories()
  } catch (error) {
    // TODO handle error
    console.log(error)
  }

  return res.json(result)
}

export default handler
