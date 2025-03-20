import { isDefined } from '@/utils/isDefined'

export const formatFileExtension = (ext: string | null | undefined) => {
  if (isDefined(ext)) {
    return ext.replace(/^\./, '').toUpperCase()
  }
  return ext
}
