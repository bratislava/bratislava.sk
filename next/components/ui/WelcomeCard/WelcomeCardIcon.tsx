import { Enum_Componentmenumenuitem_Icon } from '@bratislava/strapi-sdk-homepage'
import IconCity from '@bratislava/ui-bratislava/WelcomeCard/IconComponents/IconCity'
import IconCulture from '@bratislava/ui-bratislava/WelcomeCard/IconComponents/IconCulture'
import IconEducation from '@bratislava/ui-bratislava/WelcomeCard/IconComponents/IconEducation'
import IconEnvironment from '@bratislava/ui-bratislava/WelcomeCard/IconComponents/IconEnvironment'
import IconSocial from '@bratislava/ui-bratislava/WelcomeCard/IconComponents/IconSocial'
import IconTransport from '@bratislava/ui-bratislava/WelcomeCard/IconComponents/IconTransport'

export type IconProps = {
  isColored: boolean
  color: string
}

type WelcomeCardIconProps = {
  icon: Enum_Componentmenumenuitem_Icon
  color: string
  isColored: boolean
}

const WelcomeCardIcon = ({ icon, color, isColored }: WelcomeCardIconProps) => {
  // TODO pass color to icon compoents
  switch (icon) {
    case 'mesto_01':
      return <IconCity isColored={isColored} color={color} />
    case 'doprava_mapy_02':
      return <IconTransport isColored={isColored} color={color} />
    case 'zp_vystavba_03':
      return <IconEnvironment isColored={isColored} color={color} />
    case 'socialna_pomoc_04':
      return <IconSocial isColored={isColored} color={color} />
    case 'vzdelavanie_05':
      return <IconEducation isColored={isColored} color={color} />
    case 'kultura_06':
      return <IconCulture isColored={isColored} color={color} />
    default:
      return null
  }
}

export default WelcomeCardIcon
