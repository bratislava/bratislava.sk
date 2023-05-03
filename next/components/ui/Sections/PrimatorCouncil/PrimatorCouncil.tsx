import cx from 'classnames'
import { useLocale } from 'next-intl'
import { useMemo } from 'react'

import { PrimatorCard } from '../../PrimatorCard/PrimatorCard'

// TODO: Load from Strapi.
const sk = {
  councilCards: [
    {
      title: 'Primátor',
      imageSrc: '/primatorReal.png',
      href: 'mesto-bratislava/sprava-mesta/volene-organy/primator',
    },
    {
      title: 'Zastupiteľstvo',
      imageSrc: '/BACoatOfArms.svg',
      smImageAlign: 'right' as const,
      href: 'mesto-bratislava/sprava-mesta/volene-organy/zastupitelstvo',
    },
  ],
}

const en = {
  councilCards: [
    {
      title: 'Mayor',
      imageSrc: '/primatorReal.png',
      href: 'city-of-bratislava/city-administration/elected-bodies/mayor',
    },
    {
      title: 'City Council',
      imageSrc: '/BACoatOfArms.svg',
      href: 'city-of-bratislava/city-administration/elected-bodies/city-council',
    },
  ],
}

interface IProps {
  className?: string
}

export const PrimatorCouncil = ({ className }: IProps) => {
  const locale = useLocale()

  const data = useMemo(() => {
    if (locale === 'sk') {
      return sk
    }
    if (locale === 'en') {
      return en
    }
    return null
  }, [locale])

  return (
    <div className={cx(className, 'flex w-full flex-col gap-4 lg:flex-row lg:gap-8')}>
      {data?.councilCards?.map((primatorCard, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <PrimatorCard key={index} {...primatorCard} />
      ))}
    </div>
  )
}

export default PrimatorCouncil
