import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import AccordionShowcase from '@/src/components/styleguide/showcases/AccordionShowcase'
import AlertShowCase from '@/src/components/styleguide/showcases/AlertShowCase'
import ArticleCardShowcase from '@/src/components/styleguide/showcases/ArticleCardShowcase'
import BannerShowCase from '@/src/components/styleguide/showcases/BannerShowCase'
import ButtonShowCase from '@/src/components/styleguide/showcases/ButtonShowCase'
import CategoryCardShowcase from '@/src/components/styleguide/showcases/CategoryCardShowcase'
import ContactsShowcase from '@/src/components/styleguide/showcases/ContactsShowcase'
import EventCardShowcase from '@/src/components/styleguide/showcases/EventCardShowcase'
import HomepageHorizontalCardShowcase from '@/src/components/styleguide/showcases/HomepageHorizontalCardShowcase'
import MarkdownShowcase from '@/src/components/styleguide/showcases/MarkdownShowcase'
import SpinnerShowCase from '@/src/components/styleguide/showcases/SpinnerShowCase'
import TagShowCase from '@/src/components/styleguide/showcases/TagShowCase'
import StyleGuideWrapper from '@/src/components/styleguide/StyleGuideWrapper'
import { isProductionDeployment } from '@/src/utils/utils'

const Styleguide = () => {
  /**
   * Always create new component for adding showcase in StyleGuide
   * Path to StyleGuide showcase components should be ./next/components/styleguide/showcases
   * */
  return (
    <StyleGuideWrapper>
      {/* HERE ADD SHOWCASES */}
      <MarkdownShowcase />
      <TagShowCase />
      <ButtonShowCase />
      <SpinnerShowCase />
      <AlertShowCase />
      <AccordionShowcase />
      <BannerShowCase />
      <EventCardShowcase />
      <CategoryCardShowcase />
      <ArticleCardShowcase />
      <HomepageHorizontalCardShowcase />
      <ContactsShowcase />
    </StyleGuideWrapper>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  if (!locale || isProductionDeployment()) {
    return { notFound: true }
  }

  const [translations] = await Promise.all([serverSideTranslations(locale)])

  return {
    props: {
      ...translations,
    },
  }
}

export default Styleguide
