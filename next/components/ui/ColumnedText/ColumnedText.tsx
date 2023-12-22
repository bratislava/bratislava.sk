import { Enum_Componentsectionscolumnedtext_Contentalignment } from '@backend/graphql'
import Markdown from '@components/atoms/Markdown'
import cx from 'classnames'

export interface ColumnedTextProps {
  content: string
  contentAlignment?: Enum_Componentsectionscolumnedtext_Contentalignment | null
}

export const ColumnedText = ({
  content,
  contentAlignment = Enum_Componentsectionscolumnedtext_Contentalignment.Left,
}: ColumnedTextProps) => {
  const breakWord = '&lt;break&gt;'
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
      {columns.map((column, index) => (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={index}
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
