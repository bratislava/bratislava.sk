import { ArrowRightIcon } from '@assets/ui-icons'
import { useTranslations } from 'next-intl'

type SearchResultsHeaderProps = {
  title: string
  handleShowMore: any
}

export const SearchResultsHeader = ({ title, handleShowMore }: SearchResultsHeaderProps) => {
  const t = useTranslations()

  return (
    <div className="flex flex-col flex-wrap items-baseline justify-between gap-y-2 text-gray-800 sm:flex-row">
      <h2 className="text-size-h4">{title}</h2>
      <button className="flex items-center gap-2" type="button" onClick={handleShowMore}>
        <span className="text-size-p-large font-medium underline">
          {t('SearchPage.moreResults')}
        </span>
        <ArrowRightIcon />
      </button>
    </div>
  )
}
