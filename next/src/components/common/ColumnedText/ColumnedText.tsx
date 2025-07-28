import { useRouter } from 'next/router'

import Markdown from '@/src/components/formatting/Markdown/Markdown'
import SectionHeader from '@/src/components/layouts/SectionHeader'
import cn from '@/src/utils/cn'

export type ColumnedTextProps = {
  title: string | null | undefined
  content: string
}

/**
 * TODO Figma link
 */

// Temporarily support more columns on these specific pages, until it's not relevant and we can remove the legacy support globally
// eslint-disable-next-line unicorn/prefer-set-has
const SUPPORT_LEGACY_LAYOUT_PAGES_LIST = [
  '/doprava-a-mapy/doprava/dopravne-projekty/dunajska',
  '/vzdelavanie-a-volny-cas/sport/podujatia/turnaj-4-miest-2025/delegacie-miest',
]

const ColumnedText = ({ title, content }: ColumnedTextProps) => {
  // eslint-disable-next-line xss/no-mixed-html
  const breakWord = '<break>'
  const columns = content.split(breakWord)

  const { asPath } = useRouter()

  const supportLegacyColumnedText = SUPPORT_LEGACY_LAYOUT_PAGES_LIST.includes(asPath)

  return (
    <div className="flex flex-col gap-6 lg:gap-8">
      <SectionHeader title={title} />
      <div
        // TODO fix spacing
        className={cn('grid gap-6', {
          'grid-cols-1': columns.length === 1,
          'grid-cols-1 md:grid-cols-2': columns.length === 2,
          'grid-cols-1 md:grid-cols-3': columns.length === 3 && supportLegacyColumnedText,
          'grid-cols-1 md:grid-cols-4': columns.length === 4 && supportLegacyColumnedText,
          'grid-cols-2 md:grid-cols-3 lg:grid-cols-5':
            columns.length === 5 && supportLegacyColumnedText,
          'grid-cols-2 md:grid-cols-3 lg:grid-cols-6':
            columns.length === 6 && supportLegacyColumnedText,
          'grid-cols-2 md:grid-cols-4 lg:grid-cols-6':
            columns.length > 6 && supportLegacyColumnedText,
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
