import cn from 'utils/cn'

import { CrossIcon } from '@/assets/ui-icons'
import Button from '@/components/common/Button/Button'
import { useTranslation } from '@/utils/useTranslation'

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
  const classStyles = cn('flex w-fit items-center justify-center gap-1 rounded text-center', {
    'text-small px-2 py-0': size === 'small',
    'text-default py-0.5 px-3': size === 'large',
    'bg-grey-100': isRemovable || !isColored,
    'text-grey-700': isRemovable || !isColored,
    'bg-category-100': !isRemovable && isColored,
    'text-category-700': !isRemovable && isColored,
  })

  const iconClassStyles = cn({
    'w-2.5 h-2.5': size === 'small',
    'w-3 h-3': size === 'large',
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
