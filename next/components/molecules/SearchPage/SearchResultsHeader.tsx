import { ArrowRightIcon } from '@assets/ui-icons'
import { Typography } from '@bratislava/component-library'
import Button from '@components/forms/simple-components/Button'
import { useTranslations } from 'next-intl'

type SearchResultsHeaderProps = {
  title: string
  showButton?: boolean
  handleShowMore: () => void
}

const SearchResultsHeader = ({ title, showButton, handleShowMore }: SearchResultsHeaderProps) => {
  const t = useTranslations()

  return (
    <div className="flex flex-col flex-wrap items-baseline justify-between gap-y-2 lg:flex-row">
      <Typography type="h2" size="h4">
        {title}
      </Typography>
      {showButton ? (
        <Button variant="black-link" endIcon={<ArrowRightIcon />} onPress={handleShowMore}>
          {t('SearchPage.moreResults')}
        </Button>
      ) : null}
    </div>
  )
}

export default SearchResultsHeader
