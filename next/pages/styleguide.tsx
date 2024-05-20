import { GetServerSideProps } from 'next'

import AccordionShowcase from '@/components/styleguide/showcases/AccordionShowcase'
import AlertShowCase from '@/components/styleguide/showcases/AlertShowCase'
import BannerShowCase from '@/components/styleguide/showcases/BannerShowCase'
import BlogPostCardShowcase from '@/components/styleguide/showcases/BlogPostCardShowcase'
import ButtonShowCase from '@/components/styleguide/showcases/ButtonShowCase'
import CategoryCardShowcase from '@/components/styleguide/showcases/CategoryCardShowcase'
import ContactsShowcase from '@/components/styleguide/showcases/ContactsShowcase'
import EventCardShowcase from '@/components/styleguide/showcases/EventCardShowcase'
import HomepageHorizontalCardShowcase from '@/components/styleguide/showcases/HomepageHorizontalCardShowcase'
import SpinnerShowCase from '@/components/styleguide/showcases/SpinnerShowCase'
import TagShowCase from '@/components/styleguide/showcases/TagShowCase'
import StyleGuideWrapper from '@/components/styleguide/StyleGuideWrapper'
import { isProductionDeployment } from '@/utils/utils'

const Styleguide = () => {
  /**
   * Always create new component for adding showcase in StyleGuide
   * Path to StyleGuide showcase components should be ./next/components/styleguide/showcases
   * */
  return (
    <StyleGuideWrapper>
      {/* HERE ADD SHOWCASES */}
      <TagShowCase />
      <ButtonShowCase />
      <SpinnerShowCase />
      <AlertShowCase />
      <AccordionShowcase />
      <BannerShowCase />
      <EventCardShowcase />
      <CategoryCardShowcase />
      <BlogPostCardShowcase />
      <HomepageHorizontalCardShowcase />
      <ContactsShowcase />
    </StyleGuideWrapper>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  if (!locale || isProductionDeployment()) {
    return { notFound: true }
  }

  const [messages] = await Promise.all([import(`../messages/${locale}.json`)])

  return {
    props: {
      messages: messages.default,
    },
  }
}

export default Styleguide
