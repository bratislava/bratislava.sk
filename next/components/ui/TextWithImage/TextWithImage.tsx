import Markdown from '@components/atoms/Markdown'
import { generateImageSizes } from '@utils/generateImageSizes'
import cx from 'classnames'
import Image from 'next/image'

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
    <div className={cx(className, 'grid grid-cols-1 items-center gap-8 md:grid-cols-2')}>
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
