import Image from 'next/image'

import Markdown from '@/src/components/formatting/Markdown/Markdown'
import cn from '@/src/utils/cn'
import { generateImageSizes } from '@/src/utils/generateImageSizes'

export type TextWithImageProps = {
  className?: string
  content?: string
  imageSrc?: string
  imageWidth?: number | null
  imageHeight?: number | null
  imagePosition?: 'left' | 'right'
  imageAlternativeText?: string
}

const TextWithImage = ({
  className,
  content,
  imageSrc,
  imageWidth,
  imageHeight,
  imagePosition = 'left',
  imageAlternativeText,
}: TextWithImageProps) => {
  if (!content && !imageSrc) return null

  return (
    <div className={cn('grid grid-cols-1 items-center gap-8 md:grid-cols-2', className)}>
      {imagePosition === 'left' && imageSrc && (
        <div>
          <Image
            src={imageSrc}
            alt={imageAlternativeText ?? ''}
            width={imageWidth ?? 0}
            height={imageHeight ?? 0}
            sizes={generateImageSizes({ md: '50vw', default: '100vw' })}
          />
        </div>
      )}

      {content && (
        <div>
          <Markdown content={content} />
        </div>
      )}

      {imagePosition === 'right' && imageSrc && (
        <div className="relative">
          <Image
            src={imageSrc}
            alt={imageAlternativeText ?? ''}
            width={imageWidth ?? 0}
            height={imageHeight ?? 0}
            sizes={generateImageSizes({ md: '50vw', default: '100vw' })}
          />
        </div>
      )}
    </div>
  )
}
export default TextWithImage
