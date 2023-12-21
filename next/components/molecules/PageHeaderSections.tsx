import { PageHeaderSectionsFragment } from '@backend/graphql'
import { isPresent } from '@utils/utils'
import React from 'react'

import SubpageListPageHeaderSection from './sections/pageHeader/SubpageListPageHeaderSection'

type PageHeaderSectionsProps = {
  sections: (PageHeaderSectionsFragment | null | undefined)[] | null | undefined
}

/** Disabled no-small-switch assuming this will be expanded */
const PageHeaderSections = ({ sections }: PageHeaderSectionsProps) => {
  return (
    <>
      {sections?.filter(isPresent).map((section, index) => {
        /* eslint-disable-next-line sonarjs/no-small-switch */
        switch (section.__typename) {
          case 'ComponentSectionsSubpageList':
            /* eslint-disable-next-line react/no-array-index-key */
            return <SubpageListPageHeaderSection key={index} section={section} />

          default:
            return null
        }
      })}
    </>
  )
}

export default PageHeaderSections
