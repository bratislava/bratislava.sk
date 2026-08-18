import { Typography } from '@bratislava/component-library'

import Icon from '@/src/components/common/Icon/Icon'
import MLink from '@/src/components/common/MLink/MLink'
import { CardEntityFragment } from '@/src/services/graphql'

const CardItem = ({
  card,
  showThumbnails,
}: {
  card: CardEntityFragment
  showThumbnails: boolean
}) => {
  const { title, subtext, page, buttonText } = card

  const thumbnail = page?.pageBackgroundImage?.url

  return (
    <div className="relative flex min-h-28 w-62 shrink-0 rounded-lg border p-4">
      <div className="flex flex-col gap-6">
        {showThumbnails && thumbnail && (
          <img src={thumbnail} alt={title} className="mb-4 w-full max-w-xs rounded-lg" />
        )}

        <Typography variant="h6" className="text-start">
          {title}
        </Typography>

        <Typography variant="p-small" className="text-start">
          {subtext}
        </Typography>

        <div className="flex flex-row justify-between">
          {buttonText && (
            <MLink stretched variant="underlined" className="text-start" href={page?.path || '#'}>
              {buttonText}
            </MLink>
          )}
          <Icon
            name="arrow-right"
            className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-background-passive-primary p-1.5"
          />
        </div>
      </div>
    </div>
  )
}

export default CardItem
