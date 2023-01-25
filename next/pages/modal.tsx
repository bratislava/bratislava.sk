import { AsyncServerProps } from '@utils/types'
import CorrespondenceAddressModal from 'components/forms/segments/CorrespondenceAddressModal/CorrespondenceAddressModal'
import Button from 'components/forms/simple-components/Button'
import LoginRegisterLayout from 'components/layouts/LoginRegisterLayout'
import { GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useState } from 'react'

import PageWrapper from '../components/layouts/PageWrapper'
import { isProductionDeployment } from '../utils/utils'

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  if (isProductionDeployment()) return { notFound: true }

  const locale = ctx.locale ?? 'sk'

  return {
    props: {
      page: {
        locale: ctx.locale,
        localizations: ['sk', 'en']
          .filter((l) => l !== ctx.locale)
          .map((l) => ({
            slug: '',
            locale: l,
          })),
      },
      ...(await serverSideTranslations(locale)),
    },
  }
}

const ForgottenPasswordPage = ({ page }: AsyncServerProps<typeof getServerSideProps>) => {
  const [modalShow, setModalShow] = useState(false)

  return (
    <PageWrapper locale={page.locale} localizations={page.localizations}>
      <LoginRegisterLayout>
        <Button variant="black" text="Open modal" onPress={() => setModalShow(true)} />
        <CorrespondenceAddressModal show={modalShow} onClose={() => setModalShow(false)} />
      </LoginRegisterLayout>
    </PageWrapper>
  )
}

export default ForgottenPasswordPage
