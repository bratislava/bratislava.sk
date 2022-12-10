import { Enum_Pagecategory_Icon } from '@bratislava/strapi-sdk-homepage'
import IconCulture from '@bratislava/ui-bratislava/HomepageMenu/IconComponents/IconCulture'
import IconEducation from '@bratislava/ui-bratislava/HomepageMenu/IconComponents/IconEducation'
import IconEnvironment from '@bratislava/ui-bratislava/HomepageMenu/IconComponents/IconEnvironment'
import IconMain from '@bratislava/ui-bratislava/HomepageMenu/IconComponents/IconMain'
import IconSocial from '@bratislava/ui-bratislava/HomepageMenu/IconComponents/IconSocial'
import IconTransport from '@bratislava/ui-bratislava/HomepageMenu/IconComponents/IconTransport'

export type HomepageMenuIconSvgProps = {
  isColored: boolean
  color: string
}

const HomepageMenuIcon = ({
  icon,
  color,
  isColored,
}: {
  icon: Enum_Pagecategory_Icon
  color: string
  isColored: boolean
}) => {
  // TODO pass color to icon compoents
  switch (icon) {
    case 'mesto_01':
      return <IconMain isColored={isColored} color={color} />
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

export default HomepageMenuIcon
