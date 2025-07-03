import React from 'react'

import SubpageListPageHeaderSection from '@/src/components/sections/headers/SubpageListPageHeaderSection_Deprecated'
import { PageHeaderSectionsFragment } from '@/src/services/graphql'
import { isPresent } from '@/src/utils/utils'

type PageHeaderSectionsProps = {
  sections: (PageHeaderSectionsFragment | null | undefined)[] | null | undefined
}

const PageHeaderSections = ({ sections }: PageHeaderSectionsProps) => {
  return (
    <>
      {sections?.filter(isPresent).map((section, index) => {
        // eslint-disable-next-line sonarjs/no-small-switch
        switch (section.__typename) {
          case 'ComponentSectionsSubpageList':
            // eslint-disable-next-line react/no-array-index-key
            return <SubpageListPageHeaderSection key={index} section={section} />

          default:
            return null
        }
      })}
    </>
  )
}

export default PageHeaderSections
