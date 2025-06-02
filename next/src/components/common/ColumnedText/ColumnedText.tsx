import { Typography } from '@bratislava/component-library'

import Markdown from '@/src/components/formatting/Markdown/Markdown'
import cn from '@/src/utils/cn'

export type ColumnedTextProps = {
  title: string | null | undefined
  content: string
}

const ColumnedText = ({ title, content }: ColumnedTextProps) => {
  // eslint-disable-next-line xss/no-mixed-html
  const breakWord = '<break>'
  const columns = content.split(breakWord)

  return (
    <div className="flex flex-col gap-6 lg:gap-8">
      {title ? <Typography variant="h2">{title}</Typography> : null}
      <div
        className={cn('grid gap-6', {
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
          <Markdown
            content={column} // eslint-disable-next-line react/no-array-index-key
            key={index}
          />
        ))}
      </div>
    </div>
  )
}

export default ColumnedText
