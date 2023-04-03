import Markdown from '@components/atoms/Markdown'

export interface ColumnedTextProps {
  className?: string
  content: string
  hasBackground?: boolean
}

export const ColumnedText = ({ content, hasBackground }: ColumnedTextProps) => {
  const breakWord = '<break>'
  const columns = content.split(breakWord)
  if (!content) return null
  const columnLength = columns.length >= 12 ? 12 : columns.length
  return (
    <div
      // className={cx(className, 'columns-1 md:flex md:gap-7', {
      //   'md:columns-2': columns.length === 2,
      //   'md:columns-3': columns.length === 3,
      //   'md:columns-4': columns.length === 4,
      //   'md:columns-5': columns.length === 5,
      //   'md:columns-6': columns.length === 6,
      //   'md:columns-7': columns.length === 7,
      //   'md:columns-8': columns.length === 8,
      //   'md:columns-9': columns.length === 9,
      //   'md:columns-10': columns.length === 10,
      //   'md:columns-11': columns.length === 11,
      //   'md:columns-12': columns.length >= 12,
      // })}
      className={`md:grid-cols-${columnLength} grid grid-cols-1 md:gap-7`}
    >
      {columns.map((column, i) => (
        <div key={i}>
          <Markdown content={column} />
        </div>
      ))}
    </div>
  )
}

export default ColumnedText
