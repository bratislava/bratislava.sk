import prettyBytes from 'pretty-bytes'

import { isDefined } from '@/src/utils/isDefined'

export const formatFileSize = (size: number | undefined, language: string) => {
  if (isDefined(size)) {
    return prettyBytes(size * 1000, {
      locale: language,
    })
  }

  return size
}
