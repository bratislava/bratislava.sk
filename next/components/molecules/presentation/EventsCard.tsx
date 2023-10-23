import { ArrowRightIcon } from '@assets/ui-icons'
import { IEvent } from '@backend/dtos/eventDto'
import ImagePlaceholder from '@components/atoms/ImagePlaceholder'
import Button from '@components/forms/simple-components/Button'
import Tag from '@components/forms/simple-components/Tag'
import { formatDate } from '@utils/local-date'
import Image from 'next/image'

import CardBase from './CardBase'
import CardContent from './CardContent'

const EventCard = ({ id, title, thumbnail, startDate, place, category, type }: IEvent) => {
  return (
    <CardBase variant={null} className="h-full bg-gray-50">
      <div className="relative aspect-16/10 shrink-0">
        {thumbnail ? (
          <Image src={thumbnail} alt={title} fill className="object-cover" />
        ) : (
          <ImagePlaceholder />
        )}

        <div className="absolute left-3 top-3 flex flex-col gap-2">
          <Tag className="bg-gray-0" text={category} />

          <Tag className="bg-gray-0" text={type} />
        </div>
      </div>

      <CardContent className="grow justify-between gap-4 px-6">
        <h3 className="text-h4 line-clamp-3 group-hover:underline">{title}</h3>

        <div>
          {place && <div className="text-small line-clamp-4 text-font">{place}</div>}
          {startDate && (
            <div className="text-small  line-clamp-4 text-font">{formatDate(startDate)}</div>
          )}
        </div>

        <Button
          variant="black-link"
          stretched
          href={`/udalosti/${id}`}
          className="no-underline"
          endIcon={<ArrowRightIcon />}
        >
          Detail podujatia
        </Button>
      </CardContent>
    </CardBase>
  )
}

export default EventCard
