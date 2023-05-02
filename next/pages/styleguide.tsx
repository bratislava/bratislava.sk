import AccordionShowcase from '@components/styleguide/showcases/AccordionShowcase'
import BlogPostCardShowcase from '@components/styleguide/showcases/BlogPostCardShowcase'
import CategoryCardShowcase from '@components/styleguide/showcases/CategoryCardShowcase'
import EventCardShowcase from '@components/styleguide/showcases/EventCardShowcase'
import HomepageHorizontalCardShowcase from '@components/styleguide/showcases/HomepageHorizontalCardShowcase'
import { isProductionDeployment } from '@utils/utils'
import InputFieldShowCase from 'components/styleguide/showcases/InputFieldShowCase'
import TooltipShowCase from 'components/styleguide/showcases/TooltipShowCase'
import { GetServerSidePropsContext } from 'next'

import AlertShowCase from '../components/styleguide/showcases/AlertShowCase'
import BannerShowCase from '../components/styleguide/showcases/BannerShowCase'
import ButtonShowCase from '../components/styleguide/showcases/ButtonShowCase'
import CheckboxGroupShowCase from '../components/styleguide/showcases/CheckboxGroupedShowCase'
import DropdownShowCase from '../components/styleguide/showcases/DropdownShowCase'
import FieldHeaderShowCase from '../components/styleguide/showcases/FieldHeaderShowCase'
import ProgressBarShowCase from '../components/styleguide/showcases/ProgressBarShowCase'
import RadioButtonShowCase from '../components/styleguide/showcases/RadioButtonShowCase'
import SearchFieldShowCase from '../components/styleguide/showcases/SearchFieldShowCase'
import SelectFieldShowCase from '../components/styleguide/showcases/SelectFieldShowCase'
import ServiceCardShowCase from '../components/styleguide/showcases/ServiceCardShowCase'
import SingleCheckboxShowCase from '../components/styleguide/showcases/SingleCheckboxShowCase'
import SpinnerShowCase from '../components/styleguide/showcases/SpinnerShowCase'
import TagShowCase from '../components/styleguide/showcases/TagShowCase'
import TextAreaFieldShowCase from '../components/styleguide/showcases/TextAreaFieldShowCase'
import ToggleShowCase from '../components/styleguide/showcases/ToggleShowCase'
import StyleGuideWrapper from '../components/styleguide/StyleGuideWrapper'

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
      <RadioButtonShowCase />
      <AccordionShowcase />
      <BannerShowCase />
      <ServiceCardShowCase />
      <EventCardShowcase />
      <CategoryCardShowcase />
      <BlogPostCardShowcase />
      <HomepageHorizontalCardShowcase />

      {/* <SnackbarShowCase /> */}
    </StyleGuideWrapper>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  if (isProductionDeployment()) return { notFound: true }

  const locale = ctx.locale ?? 'sk'

  return {
    props: {
      messages: (await import(`../messages/${locale}.json`)).default,
    },
  }
}

export default Styleguide
