import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ReactElement, useState } from 'react'
import { Key, Tab, TabList, TabPanel, Tabs } from 'react-aria-components'

import AlertShowCase from '@/src/components/styleguide/showcases/AlertShowCase'
import ArticleCardShowcase from '@/src/components/styleguide/showcases/ArticleCardShowcase'
import BannerShowCase from '@/src/components/styleguide/showcases/BannerShowCase'
import ButtonShowCase from '@/src/components/styleguide/showcases/ButtonShowCase'
import CategoryCardShowcase from '@/src/components/styleguide/showcases/CategoryCardShowcase'
import ColumnsShowcase from '@/src/components/styleguide/showcases/ColumnsShowcase'
import ContactsShowcase from '@/src/components/styleguide/showcases/ContactsShowcase'
import DisclosureShowcase from '@/src/components/styleguide/showcases/DisclosureShowcase'
import HomepageHorizontalCardShowcase from '@/src/components/styleguide/showcases/HomepageHorizontalCardShowcase'
import IconShowCase from '@/src/components/styleguide/showcases/IconShowcase'
import MarkdownShowcase from '@/src/components/styleguide/showcases/MarkdownShowcase'
import SpinnerShowCase from '@/src/components/styleguide/showcases/SpinnerShowCase'
import TagShowCase from '@/src/components/styleguide/showcases/TagShowCase'
import TokensShowcase from '@/src/components/styleguide/showcases/TokensShowcase'
import TootootEventCardShowcase from '@/src/components/styleguide/showcases/TootootEventCardShowcase'
import StyleGuideWrapper from '@/src/components/styleguide/StyleGuideWrapper'
import { NOT_FOUND_SERVERSIDE } from '@/src/utils/consts'
import { isProductionDeployment } from '@/src/utils/utils'

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  if (!locale || isProductionDeployment()) {
    return NOT_FOUND_SERVERSIDE
  }

  const [translations] = await Promise.all([serverSideTranslations(locale)])

  return {
    props: {
      ...translations,
    },
  }
}

const showcases = [
  { id: 'tokens', label: 'Tokens', component: <TokensShowcase /> },
  { id: 'markdown', label: 'Markdown', component: <MarkdownShowcase /> },
  { id: 'tag', label: 'Tag', component: <TagShowCase /> },
  { id: 'button', label: 'Button', component: <ButtonShowCase /> },
  { id: 'spinner', label: 'Spinner', component: <SpinnerShowCase /> },
  { id: 'icon', label: 'Icon', component: <IconShowCase /> },
  { id: 'alert', label: 'Alert', component: <AlertShowCase /> },
  { id: 'disclosure', label: 'Disclosure', component: <DisclosureShowcase /> },
  { id: 'banner', label: 'Banner', component: <BannerShowCase /> },
  {
    id: 'tootoot-event-card',
    label: 'Tootoot Event Card',
    component: <TootootEventCardShowcase />,
  },
  { id: 'category-card', label: 'Category Card', component: <CategoryCardShowcase /> },
  { id: 'article-card', label: 'Article Card', component: <ArticleCardShowcase /> },
  {
    id: 'homepage-horizontal-card',
    label: 'Homepage Horizontal Card',
    component: <HomepageHorizontalCardShowcase />,
  },
  { id: 'contacts', label: 'Contacts', component: <ContactsShowcase /> },
  { id: 'columns', label: 'Columns', component: <ColumnsShowcase /> },
] satisfies { id: string; label: string; component: ReactElement }[]

const Styleguide = () => {
  const [selectedKey, setSelectedKey] = useState<Key>(showcases[0].id)

  return (
    <StyleGuideWrapper>
      <Tabs
        selectedKey={selectedKey}
        onSelectionChange={setSelectedKey}
        className="mb-10 flex flex-col"
      >
        <TabList className="flex flex-wrap gap-2 pb-4">
          {showcases.map(({ id, label }) => (
            <Tab
              key={id}
              id={id}
              className="border-active-default cursor-pointer rounded-md border bg-background-passive-base px-3 py-2 hover:border-border-active-tertiary-inverted-hover hover:bg-background-active-primary-soft-hover selected:border-border-active-focused selected:bg-background-active-primary-soft-hover selected:font-semibold"
            >
              {label}
            </Tab>
          ))}
        </TabList>
        {showcases.map(({ id, component }) => (
          <TabPanel key={id} id={id}>
            {component}
          </TabPanel>
        ))}
      </Tabs>
    </StyleGuideWrapper>
  )
}

export default Styleguide
