import Markdown from '@/src/components/formatting/Markdown/Markdown'
import SectionHeader from '@/src/components/layouts/SectionHeader'
import cn from '@/src/utils/cn'

export type ColumnedTextProps = {
  title: string | null | undefined
  content: string
}

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=19701-18350&t=UgfVQA53RV7lBsh5-4
 */

const ColumnedText = ({ title, content }: ColumnedTextProps) => {
  const breakWord = '<break>'
  let columns = content.split(breakWord)

  // Ensure to have maximum 2 columns, join the rest into the second column. Content admins are instructed to use only 2 columns.
  if (columns.length > 2) {
    columns = [columns[0], columns.slice(1).join('\n')]
  }

  return (
    <div className="flex flex-col gap-6 lg:gap-8">
      <SectionHeader title={title} />
      <div
        className={cn('grid gap-8', {
          'grid-cols-1': columns.length === 1, // Fallback, if no columns are used
          'grid-cols-1 md:grid-cols-2': columns.length === 2,
        })}
      >
        {columns.map((column, index) => (
          <Markdown key={index} content={column} />
        ))}
      </div>
    </div>
  )
}

export default ColumnedText
