import InputFieldShowCase from 'components/styleguide/showcases/InputFieldShowCase'
import TooltipShowCase from 'components/styleguide/showcases/TooltipShowCase'
import { GetServerSideProps } from 'next'

import AccordionShowcase from '@/components/styleguide/showcases/AccordionShowcase'
import AlertShowCase from '@/components/styleguide/showcases/AlertShowCase'
import BannerShowCase from '@/components/styleguide/showcases/BannerShowCase'
import BlogPostCardShowcase from '@/components/styleguide/showcases/BlogPostCardShowcase'
import ButtonShowCase from '@/components/styleguide/showcases/ButtonShowCase'
import CategoryCardShowcase from '@/components/styleguide/showcases/CategoryCardShowcase'
import CheckboxGroupShowCase from '@/components/styleguide/showcases/CheckboxGroupedShowCase'
import ContactsShowcase from '@/components/styleguide/showcases/ContactsShowcase'
import DropdownShowCase from '@/components/styleguide/showcases/DropdownShowCase'
import EventCardShowcase from '@/components/styleguide/showcases/EventCardShowcase'
import FieldHeaderShowCase from '@/components/styleguide/showcases/FieldHeaderShowCase'
import HomepageHorizontalCardShowcase from '@/components/styleguide/showcases/HomepageHorizontalCardShowcase'
import ProgressBarShowCase from '@/components/styleguide/showcases/ProgressBarShowCase'
import SearchFieldShowCase from '@/components/styleguide/showcases/SearchFieldShowCase'
import SelectFieldShowCase from '@/components/styleguide/showcases/SelectFieldShowCase'
import ServiceCardShowCase from '@/components/styleguide/showcases/ServiceCardShowCase'
import SingleCheckboxShowCase from '@/components/styleguide/showcases/SingleCheckboxShowCase'
import SpinnerShowCase from '@/components/styleguide/showcases/SpinnerShowCase'
import TagShowCase from '@/components/styleguide/showcases/TagShowCase'
import TextAreaFieldShowCase from '@/components/styleguide/showcases/TextAreaFieldShowCase'
import ToggleShowCase from '@/components/styleguide/showcases/ToggleShowCase'
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
      <TooltipShowCase />
      <FieldHeaderShowCase />
      <ButtonShowCase />
      <InputFieldShowCase />
      <SpinnerShowCase />
      <TextAreaFieldShowCase />
      <AlertShowCase />
      <SearchFieldShowCase />
      <ToggleShowCase />
      <DropdownShowCase />
      <SelectFieldShowCase />
      <ProgressBarShowCase />
      <SingleCheckboxShowCase />
      <CheckboxGroupShowCase />
      <AccordionShowcase />
      <BannerShowCase />
      <ServiceCardShowCase />
      <EventCardShowcase />
      <CategoryCardShowcase />
      <BlogPostCardShowcase />
      <HomepageHorizontalCardShowcase />
      <ContactsShowcase />

      {/* <SnackbarShowCase /> */}
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
