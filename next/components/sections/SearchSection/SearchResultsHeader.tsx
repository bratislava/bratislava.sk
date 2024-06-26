import { Typography } from '@bratislava/component-library'

import { ArrowRightIcon } from '@/assets/ui-icons'
import Button from '@/components/common/Button/Button'
import { useTranslation } from '@/utils/useTranslation'

type SearchResultsHeaderProps = {
  title: string
  showButton?: boolean
  handleShowMore: () => void
}

const SearchResultsHeader = ({ title, showButton, handleShowMore }: SearchResultsHeaderProps) => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col flex-wrap items-baseline justify-between gap-y-2 lg:flex-row">
      <Typography type="h2" size="h4">
        {title}
      </Typography>
      {showButton ? (
        <Button
          variant="black-link"
          endIcon={<ArrowRightIcon />}
          onPress={handleShowMore}
          data-cy="search-section-more-button"
        >
          {t('SearchPage.moreResults')}
        </Button>
      ) : null}
    </div>
  )
}

export default SearchResultsHeader
