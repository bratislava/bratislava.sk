import * as React from 'react'
import { ReactNode, useState } from 'react'

import cn from '@/src/utils/cn'
import {
  ColorCategory,
  getCategoryColorLocalStyle,
  GlobalCategoryColorProvider,
} from '@/src/utils/colors'

type BrandCategoryString =
  | 'Mesto Bratislava'
  | 'Doprava'
  | 'Zivotne prostredie'
  | 'Skolstvo'
  | 'Socialne sluzby'
  | 'Kultura'

type Brand = {
  category: ColorCategory
  label: BrandCategoryString
}

type StyleGuideWrapperProps = {
  children: ReactNode
}

const StyleGuideWrapper = ({ children }: StyleGuideWrapperProps) => {
  const [activeBrandCategory, setActiveBrandCategory] = useState<ColorCategory>('main')
  const allColors: Brand[] = [
    { category: 'main', label: 'Mesto Bratislava' },
    { category: 'transport', label: 'Doprava' },
    { category: 'environment', label: 'Zivotne prostredie' },
    { category: 'social', label: 'Skolstvo' },
    { category: 'education', label: 'Socialne sluzby' },
    { category: 'culture', label: 'Kultura' },
  ]

  const mapBrandCategory = (brand: Brand, key: number) => {
    const active = activeBrandCategory === brand.category
    const colorStyle = getCategoryColorLocalStyle({ category: brand.category })

    return (
      <button
        key={key}
        type="button"
        className={cn('m-2 h-14 w-40 rounded-lg border border-category-700 p-2 transition', {
          'bg-category-700 text-white': active,
          'bg-category-200 text-black': !active,
        })}
        style={colorStyle}
        onClick={() => {
          setActiveBrandCategory(brand.category)
        }}
      >
        {brand.label}
      </button>
    )
  }

  return (
    <main>
      <GlobalCategoryColorProvider category={activeBrandCategory} />
      <div className="min-h-screen bg-[#E5E5E5]">
        <div className="mx-auto max-w-(--breakpoint-xl) px-4 pb-64 md:px-8 md:pt-12">
          <h1 className="mb-10 text-center text-h1 underline">Style Guide</h1>
          <div className="mb-10">
            <h1 className="ml-2 text-h2">Change brand of Style Guide</h1>
            <p className="ml-2">
              <b>WARNING:</b> Components should change automatically brand color scheme after we
              change colors in :root based on chosen brand. Click on button for change in styleguide
            </p>
            <div className="mt-3 flex-row flex-wrap gap-2">{allColors.map(mapBrandCategory)}</div>
          </div>
          {children}
        </div>
      </div>
    </main>
  )
}

export default StyleGuideWrapper
