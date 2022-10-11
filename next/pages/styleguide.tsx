import { AsyncServerProps } from '@utils/types'
import { isProductionDeployment } from '@utils/utils'
import PageWrapper from 'components/layouts/PageWrapper'
import { GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import ButtonShowCase from '../components/styleguide/showcases/ButtonShowCase'
import FieldHeaderShowCase from '../components/styleguide/showcases/FieldHeaderShowCase'
import TagShowCase from '../components/styleguide/showcases/TagShowCase'
import StyleGuideWrapper from '../components/styleguide/StyleGuideWrapper'


const Styleguide = ({ page }: AsyncServerProps<typeof getServerSideProps>) => {
  /**
  * Always create new component for adding showcase in StyleGuide
   * Path to StyleGuide showcase components should be ./next/components/styleguide/showcases
  * */
  const selectOptions: MultiValue<unknown> = [
    { value: 'stuFei', label: 'STU FEI'},
    { value: 'stuFiit', label: 'STU FIIT'},
    { value: 'ukFmfi', label: 'UK FMFI'},
    { value: 'tukeFei', label: 'TUKE FEI' },
    { value: 'unizaFeit', label: 'UNIZA FEIT' }
  ]
  const [selectValueFirst, setSelectValueFirst] = useState<MultiValue<unknown>>(selectOptions.slice(0, 2))
  return (
    <PageWrapper locale={page.locale}>
      <StyleGuideWrapper>
        {/* HERE ADD SHOWCASES */}
        <TagShowCase/>
        <FieldHeaderShowCase/>
        <ButtonShowCase/>
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
