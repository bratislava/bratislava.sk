import chunk from 'lodash/chunk'

import TopServicesItem from '@/src/components/cards/TopServicesItem'
import Carousel from '@/src/components/common/Carousel/Carousel'
import { TopServicesItemFragment } from '@/src/services/graphql'

type TopServicesProps = {
  items: TopServicesItemFragment[] | null | undefined
}

const TopServices = ({ items }: TopServicesProps) => (
  <>
    <Carousel
      className="md:hidden"
      items={
        items?.length
          ? chunk(items, 3)?.map((itemsChunk, chunkIndex) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={String(chunkIndex)} className="flex w-full shrink-0 flex-col gap-2">
                {itemsChunk.map((item, itemIndex) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <TopServicesItem key={itemIndex} topServicesItem={item} />
                ))}
              </div>
            ))
          : []
      }
    />
    <ul className="hidden md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 lg:grid-cols-3">
      {items?.map((item, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <li key={index}>
          <TopServicesItem topServicesItem={item} />
        </li>
      ))}
    </ul>
  </>
)

export default TopServices
