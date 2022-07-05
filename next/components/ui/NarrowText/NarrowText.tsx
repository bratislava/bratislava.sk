import { useUIContext } from '@bratislava/common-frontend-ui-context'
import cx from 'classnames'

export interface NarrowTextProps {
  className?: string
  content?: string
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
}: NarrowTextProps) => {
  const { Markdown: UIMarkdown } = useUIContext()

  if (!content) return null

  return (
    <div
      className={cx(
        'flex',
        {
          'justify-start': align === 'left',
          'justify-center': align === 'center',
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
            'text-sm md:text-default narrow-text-wrapper',
            {
              'text-xxs md:text-sm leading-[20px] md:leading-[24px]': size === 'small',
              'text-sm md:text-default leading-[24px] md:leading-[30px]': size === 'normal',
            },
            className
          )}
          // className="text-sm md:text-default leading-[24px] md:leading-[30px] narrow-text-wrapper"
        />
      </div>
    </div>
  )
}

export default NarrowText
