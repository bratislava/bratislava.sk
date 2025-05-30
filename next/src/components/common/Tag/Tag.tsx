import { CrossIcon } from 'src/assets/icons'

import Button from '@/src/components/common/Button/Button'
import cn from '@/src/utils/cn'
import { useTranslation } from '@/src/utils/useTranslation'

type TagProps = {
  text: string
  size?: 'small' | 'large'
  isColored?: boolean
  shorthand?: boolean
  onRemove?: () => void
}

const Tag = ({ text, size = 'small', isColored = false, shorthand, onRemove }: TagProps) => {
  const { t } = useTranslation()

  const isRemovable = !!onRemove

  // STYLES
  const classStyles = cn('flex w-fit items-center justify-center gap-1 rounded-sm text-center', {
    'px-2 py-0 text-size-p-small': size === 'small',
    'px-3 py-0.5 text-size-p-default': size === 'large',
    'bg-grey-100': isRemovable || !isColored,
    'text-grey-700': isRemovable || !isColored,
    'bg-category-100': !isRemovable && isColored,
    'text-category-700': !isRemovable && isColored,
  })

  const iconClassStyles = cn({
    'h-2.5 w-2.5': size === 'small',
    'h-3 w-3': size === 'large',
  })

  const MAX_TEXT_SIZE = 10
  const tagText = shorthand
    ? `${text.slice(0, MAX_TEXT_SIZE)}${text.length > MAX_TEXT_SIZE ? '...' : ''}`
    : text

  // RENDER
  /* class name tag is crucial for good working of select dropdown */
  return (
    <div className={classStyles}>
      <div className="inline-block cursor-default select-none">{tagText}</div>
      {isRemovable && (
        <Button
          onPress={onRemove}
          icon={<CrossIcon className={iconClassStyles} />}
          aria-label={t('Tag.aria.removeTag', { tag: text })}
          className="p-0"
        />
      )}
    </div>
  )
}

export default Tag
