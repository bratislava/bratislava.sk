import {
  Enum_Componentmenumenuitem_Icon,
  Enum_Pagecategory_Color,
} from '@bratislava/strapi-sdk-homepage'
import React, { CSSProperties } from 'react'

type ColorCategory = 'main' | 'transport' | 'environment' | 'social' | 'education' | 'culture'

const colorCategoryMap = {
  red: 'main',
  blue: 'transport',
  green: 'environment',
  yellow: 'social',
  purple: 'education',
  brown: 'culture',
} satisfies Record<Enum_Pagecategory_Color, ColorCategory>

const iconCategoryMap = {
  mesto_01: 'main',
  doprava_mapy_02: 'transport',
  zp_vystavba_03: 'environment',
  socialna_pomoc_04: 'social',
  vzdelavanie_05: 'education',
  kultura_06: 'culture',
} satisfies Record<Enum_Componentmenumenuitem_Icon, ColorCategory>

const transformColorToCategory = (
  pageColor: Enum_Pagecategory_Color | null | undefined,
): ColorCategory => {
  return colorCategoryMap[pageColor ?? 'red']
}

export const transformIconToCategory = (icon: Enum_Componentmenumenuitem_Icon) => {
  return iconCategoryMap[icon] ?? 'main'
}

const generateCssVariables = (category: ColorCategory) => {
  return [100, 200, 300, 400, 500, 600, 700, 800].map(
    (weight) => [`--color-category-${weight}`, `var(--color-${category}-${weight})`] as const,
  )
}

type GlobalCategoryColorProviderProps = {
  color: Enum_Pagecategory_Color | null | undefined
}

/**
 * This component is used to provide global CSS variables for category colors.
 */
export const GlobalCategoryColorProvider = ({ color }: GlobalCategoryColorProviderProps) => {
  const category = transformColorToCategory(color)
  const cssVariables = generateCssVariables(category)
  const style = cssVariables.map(([key, value]) => `${key}: ${value};`).join('\n')

  return (
    <style jsx global>
      {`
        :root {
          ${style}
        }
      `}
    </style>
  )
}

/**
 * This function is used to generate CSS variables for category colors locally. All the children elements will have
 * the category color set to provided color.
 */
export const getStyleForColor = (color: Enum_Pagecategory_Color | null | undefined) => {
  const category = transformColorToCategory(color)
  return Object.fromEntries(generateCssVariables(category)) as CSSProperties
}

/**
 * This function is used to generate CSS variables for category colors locally. All the children elements will have
 * the category color set to provided color.
 */
export const getStyleForCategory = (category: ColorCategory) => {
  return Object.fromEntries(generateCssVariables(category)) as CSSProperties
}
