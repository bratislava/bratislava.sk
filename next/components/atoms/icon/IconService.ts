export type MenuIcon = string

interface IconUrlMap {
  size_48: { [key: MenuIcon]: string }
  size_64: { [key: MenuIcon]: string }
}

interface IconCollection {
  size_64: string
  size_48: string
}

const BASE_URL = '/icons'

export const ICON_URL_MAP: IconUrlMap = {
  size_48: {
    mesto_01: 'castle_48px_stroke.svg',
    mesto_color_01: 'castle_48px_filled.svg',
    doprava_mapy_02: 'travel_48px_stroke.svg',
    doprava_mapy_color_02: 'travel_48px_filled.svg',
    zp_vystavba_03: 'house_48px_stroke.svg',
    zp_vystavba_color_03: 'house_48px_filled.svg',
    socialna_pomoc_04: 'socialService_48px_stroke.svg',
    socialna_pomoc_color_04: 'socialService_48px_filled.svg',
    vzdelavanie_05: 'educationAndLeisure_48px_stroke.svg',
    vzdelavanie_color_05: 'educationAndLeisure_48px_filled.svg',
    kultura_06: 'cultureAndPanteon_48px_stroke.svg',
    kultura_color_06: 'cultureAndPanteon_48px_filled.svg',
    sprava_mesta_01: 'councilBuilding_48px.svg',
    transparentne_mesto_01: 'lensWithEye_48px.svg',
    dane_01: 'fee_48px.svg',
    projekty_01: 'lightBulbOff_48px.svg',
    partnerstva_01: 'coordination_48px.svg',
    mhd_02: 'tram_48px.svg',
    cyklo_02: 'bike_48px.svg',
    mapy_02: 'map_48px.svg',
    sprava_a_udrzba_02: 'road_48px.svg',
    doprava_02: 'trolleybus_48px.svg',
    parkovanie_02: 'parking_48px.svg',
    zdielana_mobilita_02: 'sharing_48px.svg',
    zivotne_prostredie_03: 'plantInHand_48px.svg',
    zelen_03: 'tree_48px.svg',
    vystavba_a_nehnutelnosti_03: 'accommodation_48px.svg',
    rozvoj_mesta_03: 'crane_48px.svg',
    verejne_osvetlenie_03: 'streetLampOn_48px.svg',
    byvanie_04: 'accommodation_48px.svg',
    sluzby_04: 'socialService_48px.svg',
    zariadenia_04: 'socialFacility_48px.svg',
    pomoc_04: 'heart_48px.svg',
    aktivity_04: 'hand_48px.svg',
    skolstvo_05: 'school_48px.svg',
    sport_05: 'sport_48px.svg',
    deti_a_mladez_05: 'children_48px.svg',
    ocenovanie_05: 'medal_48px.svg',
    dotacie_05: 'receivingGrant_48px.svg',
    kalendar_06: 'calendar_48px.svg',
    organizacie_06: 'panteon_48px.svg',
    dedicstvo_06: 'lockedChest_48px.svg',
    sluzby_06: 'stage_48px.svg',
    koncepcia_06: 'culture_48px.svg',
    komunity_06: 'community_48px.svg',
  },
  size_64: {
    mesto_01: 'castle_64px_stroke.svg',
    mesto_color_01: 'castle_64px_filled.svg',
    doprava_mapy_02: 'travel_64px_stroke.svg',
    doprava_mapy_color_02: 'travel_64px_filled.svg',
    zp_vystavba_03: 'house_64px_stroke.svg',
    zp_vystavba_color_03: 'house_64px_filled.svg',
    socialna_pomoc_04: 'socialService_64px_stroke.svg',
    socialna_pomoc_color_04: 'socialService_64px_filled.svg',
    vzdelavanie_05: 'educationAndLeisure_64px_stroke.svg',
    vzdelavanie_color_05: 'educationAndLeisure_64px_filled.svg',
    kultura_06: 'cultureAndPanteon_64px_stroke.svg',
    kultura_color_06: 'cultureAndPanteon_64px_filled.svg',
    sprava_mesta_01: 'councilBuilding_64px.svg',
    transparentne_mesto_01: 'lensWithEye_64px.svg',
    dane_01: 'fee_64px.svg',
    projekty_01: 'lightBulbOff_64px.svg',
    partnerstva_01: 'coordination_64px.svg',
    mhd_02: 'tram_64px.svg',
    cyklo_02: 'bike_64px.svg',
    mapy_02: 'map_64px.svg',
    sprava_a_udrzba_02: 'road_64px.svg',
    doprava_02: 'trolleybus_64px.svg',
    parkovanie_02: 'parking_64px.svg',
    zdielana_mobilita_02: 'sharing_64px.svg',
    zivotne_prostredie_03: 'plantInHand_64px.svg',
    zelen_03: 'tree_64px.svg',
    vystavba_a_nehnutelnosti_03: 'accommodation_64px.svg',
    rozvoj_mesta_03: 'crane_64px.svg',
    verejne_osvetlenie_03: 'streetLampOn_64px.svg',
    byvanie_04: 'accommodation_64px.svg',
    sluzby_04: 'socialService_64px.svg',
    zariadenia_04: 'socialFacility_64px.svg',
    pomoc_04: 'heart_64px.svg',
    aktivity_04: 'hand_64px.svg',
    skolstvo_05: 'school_64px.svg',
    sport_05: 'sport_64px.svg',
    deti_a_mladez_05: 'children_64px.svg',
    ocenovanie_05: 'medal_64px.svg',
    dotacie_05: 'receivingGrant_64px.svg',
    kalendar_06: 'calendar_64px.svg',
    organizacie_06: 'panteon_64px.svg',
    dedicstvo_06: 'lockedChest_64px.svg',
    sluzby_06: 'stage_64px.svg',
    koncepcia_06: 'culture_64px.svg',
    komunity_06: 'community_64px.svg',
  },
}

export function getIcon(iconName?: MenuIcon): undefined | IconCollection {
  if (!iconName) {
    return undefined
  }
  const iconSize64: string = ICON_URL_MAP.size_64?.[iconName]
  const iconSize48: string = ICON_URL_MAP.size_48?.[iconName]

  return {
    size_64: `${BASE_URL}/64px/${iconSize64}`,
    size_48: `${BASE_URL}/48px/${iconSize48}`,
  }
}
