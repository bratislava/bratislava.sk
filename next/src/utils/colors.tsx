import React, { CSSProperties } from 'react'

import {
  Enum_Componentmenumenuitem_Icon,
  Enum_Page_Pagecolor,
  Enum_Pagecategory_Color,
} from '@/src/services/graphql'

export type ColorCategory =
  | 'main'
  | 'transport'
  | 'environment'
  | 'social'
  | 'education'
  | 'culture'
  | 'grey'
  | 'starz-secondary'

type PageColor = Enum_Page_Pagecolor | Enum_Pagecategory_Color

const colorCategoryMap = {
  red: 'main',
  blue: 'transport',
  green: 'environment',
  yellow: 'social',
  purple: 'education',
  brown: 'culture',
  starz: 'starz-secondary',
} satisfies Record<PageColor, ColorCategory>

const iconCategoryMap = {
  mesto_01: 'main',
  doprava_mapy_02: 'transport',
  zp_vystavba_03: 'environment',
  socialna_pomoc_04: 'social',
  vzdelavanie_05: 'education',
  kultura_06: 'culture',
} satisfies Record<Enum_Componentmenumenuitem_Icon, ColorCategory>

const transformColorToCategory = (
  pageColor: PageColor | null | undefined,
): ColorCategory => {
  return colorCategoryMap[pageColor ?? 'red']
}

export const transformIconToCategory = (icon: Enum_Componentmenumenuitem_Icon): ColorCategory => {
  return iconCategoryMap[icon] ?? 'main'
}

const generateCssVariables = (category: ColorCategory) => {
  const fontContrastColor =
    category === 'social' || category === 'culture'
      ? 'var(--color-grey-700)'
      : 'var(--color-grey-0)'

  return [
    ...[100, 200, 300, 400, 500, 600, 700, 800].map(
      (weight) => [`--color-category-${weight}`, `var(--color-${category}-${weight})`] as const,
    ),
    ['--font-contrast-color', fontContrastColor] as const,
  ]
}

type Props =
  | {
      color: PageColor | null | undefined
      category?: never
    }
  | {
      color?: never
      category: ColorCategory
    }

/**
 * This component is used to provide global CSS variables for category colors.
 */
export const GlobalCategoryColorProvider = ({ color, category: categoryProp }: Props) => {
  const category = categoryProp ?? transformColorToCategory(color)
  const cssVariables = generateCssVariables(category)
  const style = cssVariables.map(([key, value]) => `${key}: ${value};`).join('\n')

  return (
    // eslint-disable-next-line react/no-unknown-property
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
export const getCategoryColorLocalStyle = ({ color, category: categoryProp }: Props) => {
  const category = categoryProp ?? transformColorToCategory(color)

  return Object.fromEntries(generateCssVariables(category)) as CSSProperties
}
