/* eslint-disable no-console,sonarjs/no-duplicate-string */

import ColumnsSection from '@/src/components/sections/ColumnsSection'
import {
  ColumnsSectionFragment,
  Enum_Componentsectionscolumns_Imagevariant,
  Enum_Componentsectionscolumns_Responsivelayout,
} from '@/src/services/graphql'

import Stack from '../Stack'
import Wrapper from '../Wrapper'

const image = {
  data: {
    attributes: {
      __typename: 'UploadFile' as const,
      url: 'https://cdn-api.bratislava.sk/strapi-homepage/upload/bratislava4_c7b0b62afe.png',
      name: 'Bratislava logo',
      width: 116,
      height: 105,
    },
  },
}

const sectionData: Omit<ColumnsSectionFragment, 'imageVariant' | 'responsiveLayout'> = {
  columns: [
    {
      title: 'Column 1',
      text: 'Lorem ipsum',
      image,
    },
    {
      title: 'Column 2',
      text: 'Lorem ipsum',
      image,
    },
    {
      title: 'Column 3',
      text: 'Lorem ipsum',
      image,
    },
  ],
}

const sections: ColumnsSectionFragment[] = [
  {
    title: 'Pictograms, respo: Slider',
    imageVariant:
      Enum_Componentsectionscolumns_Imagevariant.ColumnsSectionImageVariantWithCircleIconBackground,
    responsiveLayout:
      Enum_Componentsectionscolumns_Responsivelayout.ColumnsSectionResponsiveLayoutSlider,
  },
  {
    title: 'Pictograms, respo: Grid',
    imageVariant:
      Enum_Componentsectionscolumns_Imagevariant.ColumnsSectionImageVariantWithCircleIconBackground,
    responsiveLayout:
      Enum_Componentsectionscolumns_Responsivelayout.ColumnsSectionResponsiveLayoutOneColumn,
  },
  {
    title: 'Images, respo: Slider',

    imageVariant:
      Enum_Componentsectionscolumns_Imagevariant.ColumnsSectionImageVariantImageOriginalSize,
    responsiveLayout:
      Enum_Componentsectionscolumns_Responsivelayout.ColumnsSectionResponsiveLayoutSlider,
  },
  {
    title: 'Images, respo: Grid',

    imageVariant:
      Enum_Componentsectionscolumns_Imagevariant.ColumnsSectionImageVariantImageOriginalSize,
    responsiveLayout:
      Enum_Componentsectionscolumns_Responsivelayout.ColumnsSectionResponsiveLayoutOneColumn,
  },
].map((section) => ({ ...section, ...sectionData }))

const MarkdownShowcase = () => {
  return (
    <Wrapper direction="column" title="Columns">
      {sections.map((section, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Stack direction="column" key={index}>
          <ColumnsSection section={section} />{' '}
        </Stack>
      ))}
    </Wrapper>
  )
}

export default MarkdownShowcase
