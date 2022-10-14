import { PageHeader } from '@bratislava/ui-bratislava'
import Head from 'next/head'
import React, { FC } from 'react'

interface Props {
  headTitle: string
  metaContent: string
}

export const HomePageMetaHeader: FC<Props> = ({ headTitle, metaContent }) => (
  <PageHeader className="h-14 overflow-hidden">
    {/* meta description */}
    <Head>
      <title>{headTitle}</title>
      <meta name="description" content={metaContent} />
    </Head>
  </PageHeader>
)
