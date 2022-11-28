import { useUIContext } from '@bratislava/common-frontend-ui-context'
import cx from 'classnames'

export interface NarrowTextProps {
  className?: string
  content?: string
  contentStyle?: string
  width?: 'narrow' | 'default' | 'wide' | 'full'
  align?: 'left' | 'center' | 'right'
  size?: 'small' | 'normal'
  hasBackground?: boolean
}

export const NarrowText = ({
  className,
  content,
  hasBackground,
  width = 'default',
  align = 'center',
  size = 'normal',
  contentStyle,
}: NarrowTextProps) => {
  const { Markdown: UIMarkdown } = useUIContext()

  if (!content) return null

  return (
    <div
      className={cx(
        'flex',
        {
          'justify-start': align === 'left',
          'justify-center text-title-center': align === 'center',
          'justify-end': align === 'right',
        },
        className
      )}
    >
      <div
        className={cx('w-full', {
          'md:w-1/2': width === 'narrow',
          'md:w-8/12': width === 'default',
          'md:w-10/12': width === 'wide',
          'md:w-full': width === 'full',
        })}
      >
        <UIMarkdown
          content={content}
          hasBackground={hasBackground}
          className={cx(
            'text-p2 md:text-p1 narrow-text-wrapper',
            {
              'text-p4 md:text-p2 leading-[20px] md:leading-[24px]': size === 'small',
              'text-p2 md:text-p1 leading-[24px] md:leading-[30px]': size === 'normal',
            },
            contentStyle
          )}
        />
      </div>
    </div>
  )
}

export default NarrowText
