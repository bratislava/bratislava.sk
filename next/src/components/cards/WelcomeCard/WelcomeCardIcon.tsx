import { useMemo } from 'react'

import IconCity from '@/src/components/cards/WelcomeCard/IconComponents/IconCity'
import IconCulture from '@/src/components/cards/WelcomeCard/IconComponents/IconCulture'
import IconEducation from '@/src/components/cards/WelcomeCard/IconComponents/IconEducation'
import IconEnvironment from '@/src/components/cards/WelcomeCard/IconComponents/IconEnvironment'
import IconSocial from '@/src/components/cards/WelcomeCard/IconComponents/IconSocial'
import IconTransport from '@/src/components/cards/WelcomeCard/IconComponents/IconTransport'
import { Enum_Componentmenumenuitem_Icon } from '@/src/services/graphql'
import { getCategoryColorLocalStyle, transformIconToCategory } from '@/src/utils/colors'

export type IconProps = {
  isColored: boolean
  className?: string
}

type WelcomeCardIconProps = {
  icon: Enum_Componentmenumenuitem_Icon
  isColored: boolean
}

const WelcomeCardIcon = ({ icon, isColored }: WelcomeCardIconProps) => {
  const category = transformIconToCategory(icon)
  const colorStyle = getCategoryColorLocalStyle({ category })

  const IconComponent = useMemo(() => {
    const icons = {
      mesto_01: IconCity,
      doprava_mapy_02: IconTransport,
      zp_vystavba_03: IconEnvironment,
      socialna_pomoc_04: IconSocial,
      vzdelavanie_05: IconEducation,
      kultura_06: IconCulture,
    }

    return icons[icon] ?? null
  }, [icon])

  return (
    <div style={colorStyle} className="flex size-[65px] shrink-0 items-center justify-center">
      <IconComponent isColored={isColored} className="size-[48px] lg:size-[65px]" />
    </div>
  )
}

export default WelcomeCardIcon
