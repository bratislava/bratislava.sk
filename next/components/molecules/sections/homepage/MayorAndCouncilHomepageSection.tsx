import MayorAndCouncilCard from '@components/molecules/presentation/MayorAndCouncilCard'
import { getCommonLinkProps } from '@utils/getCommonLinkProps'
import { useHomepageContext } from '@utils/homepageContext'
import { useTranslations } from 'next-intl'
import React from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
  className?: string
}

export const MayorAndCouncilHomepageSection = ({ className }: Props) => {
  const t = useTranslations()

  const { homepage } = useHomepageContext()
  const { mayorAndCouncil } = homepage?.attributes ?? {}
  const { title, text, mayorCard, councilCard } = mayorAndCouncil ?? {}

  const { children: mayorLinkLabel, ...mayorLinkProps } = getCommonLinkProps(mayorCard)
  const { children: councilLinkLabel, ...councilLinkProps } = getCommonLinkProps(councilCard)

  return (
    <div className={twMerge('flex flex-col gap-6', className)}>
      {title || text ? (
        <div className="flex flex-col gap-2 text-center">
          {title && <h2 className="text-h2">{title}</h2>}
          {text && <div>{text}</div>}
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
