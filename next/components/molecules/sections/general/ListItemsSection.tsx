import { ComponentSectionsListItemsFragment } from '@bratislava/strapi-sdk-homepage'
import { ListItems } from '@bratislava/ui-bratislava'
import { parsePageLink } from '@utils/page'
import React from 'react'

type ListItemsSectionProps = {
  section: ComponentSectionsListItemsFragment
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
