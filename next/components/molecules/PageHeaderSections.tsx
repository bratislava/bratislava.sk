import React from 'react'

import { PageHeaderSectionsFragment } from '@/backend/graphql'
import SubpageListPageHeaderSection from '@/components/molecules/sections/pageHeader/SubpageListPageHeaderSection'
import { isPresent } from '@/utils/utils'

type PageHeaderSectionsProps = {
  sections: (PageHeaderSectionsFragment | null | undefined)[] | null | undefined
}

const PageHeaderSections = ({ sections }: PageHeaderSectionsProps) => {
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {sections?.filter(isPresent).map((section, index) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        switch (section.__typename) {
          case 'ComponentSectionsSubpageList':
            return <SubpageListPageHeaderSection key={index} section={section} />

          default:
            return null
        }
      })}
    </>
  )
}

export default PageHeaderSections
