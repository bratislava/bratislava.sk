import { Typography } from '@bratislava/component-library'
import React from 'react'
import { twMerge } from 'tailwind-merge'

import MayorAndCouncilCard from '@/components/cards/MayorAndCouncilCard'
import { useHomepageContext } from '@/components/providers/HomepageContextProvider'
import { getCommonLinkProps } from '@/utils/getCommonLinkProps'
import { useTranslation } from '@/utils/useTranslation'

type Props = {
  className?: string
}

const MayorAndCouncilHomepageSection = ({ className }: Props) => {
  const { t } = useTranslation()

  const { homepage } = useHomepageContext()
  const { mayorAndCouncil } = homepage?.attributes ?? {}
  const { title, text, mayorCard, councilCard } = mayorAndCouncil ?? {}

  const { children: mayorLinkLabel, ...mayorLinkProps } = getCommonLinkProps(mayorCard)
  const { children: councilLinkLabel, ...councilLinkProps } = getCommonLinkProps(councilCard)

  return (
    <div className={twMerge('flex flex-col gap-6', className)}>
      {title || text ? (
        <div className="flex flex-col gap-2 text-center">
          {title && <Typography type="h2">{title}</Typography>}
          {text && <Typography type="p">{text}</Typography>}
        </div>
      ) : null}
      <div className="flex w-full flex-col gap-4 lg:flex-row lg:gap-8">
        {mayorLinkLabel && (
          <MayorAndCouncilCard
            imageSrc="/primatorReal.png"
            title={mayorLinkLabel}
            linkProps={{ children: t('readMore'), ...mayorLinkProps }}
          />
        )}
        {councilLinkLabel && (
          <MayorAndCouncilCard
            imageSrc="/BACoatOfArms.svg"
            title={councilLinkLabel}
            linkProps={{ children: t('readMore'), ...councilLinkProps }}
          />
        )}
      </div>
    </div>
  )
}

export default MayorAndCouncilHomepageSection
