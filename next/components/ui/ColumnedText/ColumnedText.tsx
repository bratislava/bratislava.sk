import Markdown from '@components/atoms/Markdown'
import cx from 'classnames'

import { Enum_Componentsectionscolumnedtext_Contentalignment } from '@/backend/graphql'

export type ColumnedTextProps = {
  className?: string
  content: string
  hasBackground?: boolean
  contentAlignment?: Enum_Componentsectionscolumnedtext_Contentalignment | null
}

const ColumnedText = ({
  content,
  hasBackground,
  contentAlignment = Enum_Componentsectionscolumnedtext_Contentalignment.Left,
}: ColumnedTextProps) => {
  const breakWord = '<break>'
  const columns = content.split(breakWord)
  if (!content) return null
  return (
    <div
      className={cx('grid gap-6', {
        'grid-cols-1': columns.length === 1,
        'grid-cols-1 md:grid-cols-2': columns.length === 2,
        'grid-cols-1 md:grid-cols-3': columns.length === 3,
        'grid-cols-1 md:grid-cols-4': columns.length === 4,
        'grid-cols-2 md:grid-cols-3 lg:grid-cols-5': columns.length === 5,
        'grid-cols-2 md:grid-cols-3 lg:grid-cols-6': columns.length === 6,
        'grid-cols-2 md:grid-cols-4 lg:grid-cols-6': columns.length > 6,
      })}
    >
      {columns.map((column, i) => (
        <div
          key={i}
          className={cx({
            'text-left':
              contentAlignment === Enum_Componentsectionscolumnedtext_Contentalignment.Left,
            'text-center':
              contentAlignment === Enum_Componentsectionscolumnedtext_Contentalignment.Center,
            'text-right':
              contentAlignment === Enum_Componentsectionscolumnedtext_Contentalignment.Right,
          })}
        >
          <Markdown content={column} />
        </div>
      ))}
    </div>
  )
}

export default ColumnedText
