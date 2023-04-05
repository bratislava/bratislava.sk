import { Enum_Componentmenumenuitem_Icon } from '@bratislava/strapi-sdk-homepage'
import IconCity from '@bratislava/ui-bratislava/WelcomeCard/IconComponents/IconCity'
import IconCulture from '@bratislava/ui-bratislava/WelcomeCard/IconComponents/IconCulture'
import IconEducation from '@bratislava/ui-bratislava/WelcomeCard/IconComponents/IconEducation'
import IconEnvironment from '@bratislava/ui-bratislava/WelcomeCard/IconComponents/IconEnvironment'
import IconSocial from '@bratislava/ui-bratislava/WelcomeCard/IconComponents/IconSocial'
import IconTransport from '@bratislava/ui-bratislava/WelcomeCard/IconComponents/IconTransport'
import { getCategoryColorLocalStyle, transformIconToCategory } from '@utils/colors'
import { useMemo } from 'react'

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
