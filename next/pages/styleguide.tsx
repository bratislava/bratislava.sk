import { AsyncServerProps } from '@utils/types'
import { isProductionDeployment } from '@utils/utils'
import PageWrapper from 'components/layouts/PageWrapper'
import DatePickerShowCase from 'components/styleguide/showcases/DatePickerShowCase'
import InputFieldShowCase from 'components/styleguide/showcases/InputFieldShowCase'
import TimePickerShowCase from 'components/styleguide/showcases/TimePickerShowCase'
import TooltipShowCase from 'components/styleguide/showcases/TooltipShowCase'
import { GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import AlertShowCase from '../components/styleguide/showcases/AlertShowCase'
import ButtonShowCase from '../components/styleguide/showcases/ButtonShowCase'
import DropdownShowCase from '../components/styleguide/showcases/DropdownShowCase'
import FieldHeaderShowCase from '../components/styleguide/showcases/FieldHeaderShowCase'
import SearchFieldShowCase from '../components/styleguide/showcases/SearchFieldShowCase'
import SelectFieldShowCase from '../components/styleguide/showcases/SelectFieldShowCase'
import SpinnerShowCase from '../components/styleguide/showcases/SpinnerShowCase'
import TagShowCase from '../components/styleguide/showcases/TagShowCase'
import TextAreaFieldShowCase from '../components/styleguide/showcases/TextAreaFieldShowCase'
import ToggleShowCase from '../components/styleguide/showcases/ToggleShowCase'
import UploadShowCase from '../components/styleguide/showcases/UploadShowCase'
import StyleGuideWrapper from '../components/styleguide/StyleGuideWrapper'

const Styleguide = ({ page }: AsyncServerProps<typeof getServerSideProps>) => {
  /**
   * Always create new component for adding showcase in StyleGuide
   * Path to StyleGuide showcase components should be ./next/components/styleguide/showcases
   * */
  return (
    <PageWrapper locale={page.locale}>
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
        <UploadShowCase />
        <DropdownShowCase />
        <SelectFieldShowCase />
      </StyleGuideWrapper>
    </PageWrapper>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  if (isProductionDeployment()) return { notFound: true }

  const locale = ctx.locale ?? 'sk'

  return {
    props: {
      page: {
        locale: ctx.locale,
      },
      ...(await serverSideTranslations(locale)),
    },
  }
}

export default Styleguide
