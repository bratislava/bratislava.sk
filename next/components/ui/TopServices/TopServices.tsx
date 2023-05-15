import { TopServicesItemFragment } from '@backend/graphql'
import Carousel from '@components/organisms/Carousel/Carousel'
import chunk from 'lodash/chunk'

import { TopServicesItem } from '../TopServicesItem/TopServicesItem'

interface IProps {
  items: TopServicesItemFragment[] | null | undefined
}

export const TopServices = ({ items }: IProps) => (
  <>
    {/* TODO standardize negative scroll spacing and card width */}
    <Carousel
      className="-mx-4 md:hidden"
      shiftIndex={1}
      visibleCount={1}
      listClassName="px-4 gap-2"
      itemClassName="w-[calc(100%-1rem)]"
      hideControls
      items={
        items?.length
          ? chunk(items, 3)?.map((itemsChunk, chunkIndex) => ({
              key: String(chunkIndex),
              element: (
                <div className="flex w-full shrink-0 flex-col gap-2">
                  {itemsChunk.map((item, itemIndex) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <TopServicesItem key={itemIndex} topServicesItem={item} />
                  ))}
                </div>
              ),
            }))
          : []
      }
    />
    <ul className="hidden md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 lg:grid-cols-3">
      {items?.map((item, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <TopServicesItem key={index} topServicesItem={item} />
      ))}
    </ul>
  </>
)

export default TopServices
