import AccordionShowcase from '@components/styleguide/showcases/AccordionShowcase'
import EventCardShowcase from '@components/styleguide/showcases/EventCardShowcase'
import { isProductionDeployment } from '@utils/utils'
import DatePickerShowCase from 'components/styleguide/showcases/DatePickerShowCase'
import InputFieldShowCase from 'components/styleguide/showcases/InputFieldShowCase'
import TimePickerShowCase from 'components/styleguide/showcases/TimePickerShowCase'
import TooltipShowCase from 'components/styleguide/showcases/TooltipShowCase'
import { GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

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
      <DatePickerShowCase />
      <InputFieldShowCase />
      <SpinnerShowCase />
      <TextAreaFieldShowCase />
      <AlertShowCase />
      <SearchFieldShowCase />
      <ToggleShowCase />
      <TimePickerShowCase />
      <DropdownShowCase />
      <SelectFieldShowCase />
      <ProgressBarShowCase />
      <SingleCheckboxShowCase />
      <CheckboxGroupShowCase />
      <RadioButtonShowCase />
      <BannerShowCase />
      <ServiceCardShowCase />
      <EventCardShowcase />
      <AccordionShowcase />

      {/* <SnackbarShowCase /> */}
    </StyleGuideWrapper>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  if (isProductionDeployment()) return { notFound: true }

  const locale = ctx.locale ?? 'sk'

  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  }
}

export default Styleguide
