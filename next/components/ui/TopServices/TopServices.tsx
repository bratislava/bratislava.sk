import { TopServicesItemFragment } from '@bratislava/strapi-sdk-homepage'
import { HorizontalScrollWrapper } from '@components/ui/HorizontalScrollWrapper/HorizontalScrollWrapper'
import chunk from 'lodash/chunk'

import { TopServicesItem } from '../TopServicesItem/TopServicesItem'

interface IProps {
  items: TopServicesItemFragment[] | null | undefined
}

export const TopServices = ({ items }: IProps) => (
  <>
    <HorizontalScrollWrapper className="-mx-8 gap-x-2 px-8 md:hidden">
      {items?.length
        ? chunk(items, 3)?.map((itemsChunk, chunkIndex) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={chunkIndex} className="flex w-full shrink-0 flex-col gap-2">
              {itemsChunk.map((item, itemIndex) => (
                // eslint-disable-next-line react/no-array-index-key
                <TopServicesItem key={itemIndex} topServicesItem={item} />
              ))}
            </div>
          ))
        : null}
    </HorizontalScrollWrapper>
    <ul className="hidden md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 lg:grid-cols-3">
      {items?.map((item, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <TopServicesItem key={index} topServicesItem={item} />
      ))}
    </ul>
  </>
)

export default TopServices
