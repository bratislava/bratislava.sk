// this is non-production code
// disabling eslint/ts checks instead of fixing them
// @ts-nocheck
import { AsyncServerProps } from '@utils/types'
import useAccount from '@utils/useAccount'
import { isProductionDeployment } from '@utils/utils'
import Button from 'components/forms/simple-components/Button'
import PageWrapper from 'components/layouts/PageWrapper'
import { Wrapper } from 'components/styleguide/Wrapper'
import { GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useState } from 'react'

import { useEffectOnce } from 'usehooks-ts'

const CognitoPrototype = ({ page }: AsyncServerProps<typeof getServerSideProps>) => {
  const { getAccessToken } = useAccount()
  const [accessToken, setAccessToken] = useState('')

  useEffectOnce(() => {
    getAccessToken().then(setAccessToken).catch(console.log)
  })

  return (
    <PageWrapper locale={page.locale}>
      <div className="font-inter min-h-screen bg-[#E5E5E5]">
        <div className="mx-auto max-w-screen-lg md:px-12 md:pt-12 pb-64">
          <Wrapper
            direction="column"
            title="Below you can see the access token of currently logged-in user"
          >
            {accessToken || (
              <Button href="/login" label="No user - go to login" variant="link-category" />
            )}
          </Wrapper>
        </div>
      </div>
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

export default CognitoPrototype
