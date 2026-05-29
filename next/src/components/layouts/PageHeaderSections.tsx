import { Breadcrumb } from '@/src/components/common/Breadcrumbs/Breadcrumbs'
import PageHeader from '@/src/components/common/PageHeader/PageHeader'
import PageHeaderEvent from '@/src/components/sections/headers/PageHeaderEvent'
import PageHeaderFacility from '@/src/components/sections/headers/PageHeaderFacility'
import {
  Enum_Page_Pagecolor,
  PageEntityFragment,
  PageHeaderSectionsFragment,
} from '@/src/services/graphql'
import { isDefined } from '@/src/utils/isDefined'

type Props = Pick<
  PageEntityFragment,
  'title' | 'subtext' | 'headerLinks' | 'pageBackgroundImage' | 'hasWaves'
> & {
  breadcrumbs: Breadcrumb[]
  header: PageHeaderSectionsFragment | null | undefined
  pageColor?: Enum_Page_Pagecolor | null | undefined
}

const PageHeaderSections = ({
  title,
  subtext,
  headerLinks,
  pageBackgroundImage,
  hasWaves,
  breadcrumbs,
  header,
  pageColor,
}: Props) => {
  const filteredHeaderLinks = headerLinks?.filter(isDefined) ?? []

  switch (header?.__typename) {
    case 'ComponentHeaderSectionsEvent':
      return (
        <PageHeaderEvent
          title={title}
          breadcrumbs={breadcrumbs}
          headerLinks={filteredHeaderLinks}
          image={pageBackgroundImage}
          header={header}
        />
      )

    case 'ComponentHeaderSectionsFacility':
      return (
        <PageHeaderFacility
          title={title}
          breadcrumbs={breadcrumbs}
          headerLinks={filteredHeaderLinks}
          header={header}
        />
      )

    default:
      return (
        <PageHeader
          title={title}
          subtext={subtext}
          breadcrumbs={breadcrumbs}
          headerLinks={filteredHeaderLinks}
          imageSrc={pageBackgroundImage?.url}
          hasWaves={hasWaves}
          color={pageColor}
        />
      )
  }
}

export default PageHeaderSections
