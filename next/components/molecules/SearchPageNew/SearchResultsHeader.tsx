import { ArrowRightIcon } from '@assets/ui-icons'
import { useTranslations } from 'next-intl'

export interface SearchResultsHeaderProps {
  title: string
  // FIXME: set type well
  handleShowMore: any
}

export const SearchResultsHeader = ({ title, handleShowMore }: SearchResultsHeaderProps) => {
  const t = useTranslations()

  return (
    <div className="mb-4 flex flex-row flex-wrap items-baseline justify-between">
      <h2 className="text-size-h4 text-gray-800">{title}</h2>
      <button
        className="flex items-center gap-2 text-main-700"
        type="button"
        onClick={handleShowMore}
      >
        <span className="text-size-p-large font-medium underline">
          {t('SearchPage.moreResults')}
        </span>
        <ArrowRightIcon />
      </button>
    </div>
  )
}
