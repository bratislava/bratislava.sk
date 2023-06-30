import { isDefined } from '@utils/isDefined'
import prettyBytes from 'pretty-bytes'

export const formatFileSize = (size: number | undefined, language: string) => {
  if (isDefined(size)) {
    return prettyBytes(size * 1000, {
      locale: language,
    })
  }
  return size
}
