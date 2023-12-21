import { ArrowRightIcon } from '@assets/ui-icons'
import { Typography } from '@bratislava/component-library'
import Button from '@components/forms/simple-components/Button'
import { useTranslations } from 'next-intl'

type SearchResultsHeaderProps = {
  title: string
  handleShowMore: () => void
}

export const SearchResultsHeader = ({ title, handleShowMore }: SearchResultsHeaderProps) => {
  const t = useTranslations()

  return (
    <div className="flex flex-col flex-wrap items-baseline justify-between gap-y-2 text-gray-800 sm:flex-row">
      <Typography type="h2" size="h4" className="text-gray-800">
        {title}
      </Typography>
      <Button variant="black-link" endIcon={<ArrowRightIcon />} onPress={handleShowMore}>
        {t('SearchPage.moreResults')}
      </Button>
    </div>
  )
}
