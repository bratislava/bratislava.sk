import Markdown from '@components/atoms/Markdown'
import cx from 'classnames'

export interface NarrowTextProps {
  className?: string
  content?: string | null
  contentStyle?: string
  width?: 'narrow' | 'default' | 'wide' | 'full' | null
  align?: 'left' | 'center' | 'right' | null
  size?: 'small' | 'normal' | null
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
  if (!content) return null

  return (
    <div
      className={cx(
        'flex',
        {
          'justify-start': align === 'left',
          'text-title-center justify-center': align === 'center',
          'justify-end': align === 'right',
        },
        className,
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
        {/* TODO may need smaller/condensed styles for size === 'small' */}
        <Markdown content={content} />
      </div>
    </div>
  )
}

export default NarrowText
