import { useUIContext } from '@bratislava/common-frontend-ui-context'
import cx from 'classnames'

export interface TextWithImageProps {
  className?: string
  content?: string
  imageSrc?: string
  imagePosition?: 'left' | 'right'
  imageShadow: boolean
  imageAlternativeText?: string
}

export const TextWithImage = ({
  className,
  content,
  imageSrc,
  imagePosition = 'left',
  imageShadow = false,
  imageAlternativeText,
}: TextWithImageProps) => {
  const { Markdown: UIMarkdown, Image: UIImage } = useUIContext()

  if (!content && !imageSrc) return null

  return (
    <div className={cx(className, 'items-center grid grid-cols-1 md:grid-cols-2 gap-7.5')}>
      {imagePosition === 'left' && imageSrc && (
        <div>
          <UIImage alt={imageAlternativeText} src={imageSrc} shadow={imageShadow} />
        </div>
      )}

      {content && (
        <div>
          <UIMarkdown content={content} className="text-p2 leading-[24px] md:text-p1 md:leading-[30px]" />
        </div>
      )}

      {imagePosition === 'right' && imageSrc && (
        <div>
          <UIImage alt={imageAlternativeText} src={imageSrc} shadow={imageShadow} />
        </div>
      )}
    </div>
  )
}
export default TextWithImage
