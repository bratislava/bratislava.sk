import React from 'react'

import MayorAndCouncilCard from '@/src/components/cards/MayorAndCouncilCard'
import SectionHeader from '@/src/components/layouts/SectionHeader'
import { useHomepageContext } from '@/src/components/providers/HomepageContextProvider'
import cn from '@/src/utils/cn'
import { getLinkProps } from '@/src/utils/getLinkProps'
import { useTranslation } from '@/src/utils/useTranslation'

type Props = {
  className?: string
}

const MayorAndCouncilHomepageSection = ({ className }: Props) => {
  const { t } = useTranslation()

  const { homepage } = useHomepageContext()
  const { mayorAndCouncil } = homepage ?? {}
  const { title, text, mayorCard, councilCard } = mayorAndCouncil ?? {}

  const { children: mayorLinkLabel, ...mayorLinkProps } = getLinkProps(mayorCard)
  const { children: councilLinkLabel, ...councilLinkProps } = getLinkProps(councilCard)

  return (
    <div className={cn('flex flex-col gap-6', className)}>
      <SectionHeader title={title} text={text} isCentered />
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
