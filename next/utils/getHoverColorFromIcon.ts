import { Enum_Componentmenumenuitem_Icon } from '@bratislava/strapi-sdk-homepage'

export const getHoverColorFromIcon = (icon: Enum_Componentmenumenuitem_Icon) => {
  // eslint-disable-next-line default-case
  switch (icon) {
    case 'mesto_01':
      return '--color-main-600'
    case 'doprava_mapy_02':
      return '--color-transport-600'
    case 'zp_vystavba_03':
      return '--color-environment-600'
    case 'socialna_pomoc_04':
      return '--color-social-600'
    case 'vzdelavanie_05':
      return '--color-education-600'
    case 'kultura_06':
      return '--color-culture-600'
    default:
      return '--color-main-600'
  }
}

export const transformIconToCategory = (icon: Enum_Componentmenumenuitem_Icon) => {
  switch (icon) {
    case 'mesto_01':
      return 'main'
    case 'doprava_mapy_02':
      return 'transport'
    case 'zp_vystavba_03':
      return 'environment'
    case 'socialna_pomoc_04':
      return 'social'
    case 'vzdelavanie_05':
      return 'education'
    case 'kultura_06':
      return 'culture'
    default:
      return 'main'
  }
}
