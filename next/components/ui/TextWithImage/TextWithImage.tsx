import { useUIContext } from '@bratislava/common-frontend-ui-context'
import { generateImageSizes } from '@utils/generateImageSizes'
import cx from 'classnames'
import Image from 'next/image'

export interface TextWithImageProps {
  className?: string
  content?: string
  imageSrc?: string
  imageWidth?: number | null
  imageHeight?: number | null
  imagePosition?: 'left' | 'right'
  imageShadow: boolean
  imageAlternativeText?: string
}

export const TextWithImage = ({
  className,
  content,
  imageSrc,
  imageWidth,
  imageHeight,
  imagePosition = 'left',
  imageShadow = false,
  imageAlternativeText,
}: TextWithImageProps) => {
  const { Markdown: UIMarkdown } = useUIContext()

  if (!content && !imageSrc) return null

  return (
    <div className={cx(className, 'items-center grid grid-cols-1 md:grid-cols-2 gap-8')}>
      {imagePosition === 'left' && imageSrc && (
        <div>
          <Image
            src={imageSrc}
            alt={imageAlternativeText ?? ''}
            width={imageWidth ?? 0}
            height={imageHeight ?? 0}
            sizes={generateImageSizes({ md: '100vw', default: '50vw' })}
            className="object-fit w-full h-full"
          />
        </div>
      )}

      {content && (
        <div>
          <UIMarkdown
            content={content}
            className="text-p2 md:text-p1 leading-[24px] md:leading-[30px]"
          />
        </div>
      )}

      {imagePosition === 'right' && imageSrc && (
        <div className="relative">
          <Image
            src={imageSrc}
            alt={imageAlternativeText ?? ''}
            width={imageWidth ?? 0}
            height={imageHeight ?? 0}
            sizes={generateImageSizes({ md: '100vw', default: '50vw' })}
            className="object-fit w-full h-full"
          />
        </div>
      )}
    </div>
  )
}
export default TextWithImage
