import { Typography } from '@bratislava/component-library'
import { useTranslation } from 'next-i18next'
import React from 'react'

import MLink from '@/src/components/common/MLink/MLink'

type Props = {
  alias: string | null | undefined
  variant?: 'page' | 'article'
}

// Based on OLO, Inspired by hel.fi, e.g. here: https://www.hel.fi/fi/sosiaali-ja-terveyspalvelut/lasten-ja-perheiden-palvelut

const AliasInfoMessage = ({ alias, variant = 'page' }: Props) => {
  const { t } = useTranslation()

  if (!alias) {
    return null
  }

  const translationMap = {
    page: t('AliasInfoMessage.message.page'),
    article: t('AliasInfoMessage.message.article'),
  }

  return (
    <div className="py-8 italic">
      <Typography variant="p-default">
        {`${translationMap[variant]} `}
        <MLink href={`/${alias}`} variant="underlined">
          bratislava.sk/{alias}
        </MLink>
        .
      </Typography>
    </div>
  )
}

export default AliasInfoMessage
