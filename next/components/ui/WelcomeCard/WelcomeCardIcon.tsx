import { useMemo } from 'react'

import { Enum_Componentmenumenuitem_Icon } from '@/backend/graphql'
import IconCity from '@/components/ui/WelcomeCard/IconComponents/IconCity'
import IconCulture from '@/components/ui/WelcomeCard/IconComponents/IconCulture'
import IconEducation from '@/components/ui/WelcomeCard/IconComponents/IconEducation'
import IconEnvironment from '@/components/ui/WelcomeCard/IconComponents/IconEnvironment'
import IconSocial from '@/components/ui/WelcomeCard/IconComponents/IconSocial'
import IconTransport from '@/components/ui/WelcomeCard/IconComponents/IconTransport'
import { getCategoryColorLocalStyle, transformIconToCategory } from '@/utils/colors'

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
    <div style={colorStyle} className="flex h-[65px] w-[65px] shrink-0 items-center justify-center">
      <IconComponent isColored={isColored} className="h-[48px] w-[48px] lg:h-[65px] lg:w-[65px]" />
    </div>
  )
}

export default WelcomeCardIcon
