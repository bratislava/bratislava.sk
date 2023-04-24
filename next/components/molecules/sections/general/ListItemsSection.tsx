import { ListItemsSectionFragment } from '@bratislava/strapi-sdk-homepage'
import { ListItems } from '@bratislava/ui-bratislava/ListItems/ListItems'
import { parsePageLink } from '@utils/page'
import React from 'react'

type ListItemsSectionProps = {
  section: ListItemsSectionFragment
}

const ListItemsSection = ({ section }: ListItemsSectionProps) => {
  return (
    <ListItems
      title={section.title ?? ''}
      listItems={
        section.listItems?.map((listItem) => ({
          content: listItem?.content ?? undefined,
          circleOption: listItem?.circleOption ?? 'primary',
          moreLink:
            parsePageLink({
              title: listItem?.moreLinkTitle,
              url: listItem?.moreLinkUrl,
              page: listItem?.moreLinkPage,
            }) ?? undefined,
        })) ?? undefined
      }
    />
  )
}

export default ListItemsSection
