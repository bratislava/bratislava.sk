import {
  ColorCategory,
  getCategoryColorLocalStyle,
  GlobalCategoryColorProvider,
} from '@utils/colors'
import cx from 'classnames'
import * as React from 'react'
import { ReactNode, useState } from 'react'

type BrandCategoryString =
  | 'Mesto Bratislava'
  | 'Doprava'
  | 'Zivotne prostredie'
  | 'Skolstvo'
  | 'Socialne sluzby'
  | 'Kultura'

interface Brand {
  category: ColorCategory
  label: BrandCategoryString
}

interface StyleGuideWrapperProps {
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
        className={cx(
          'm-2 h-14 w-40 rounded-lg border border-category-700 p-2 shadow-lg transition',
          {
            'bg-category-700 text-white': active,
            'text-black bg-category-200': !active,
          },
        )}
        style={colorStyle}
        onClick={() => setActiveBrandCategory(brand.category)}
      >
        {brand.label}
      </button>
    )
  }

  return (
    <main>
      <GlobalCategoryColorProvider category={activeBrandCategory} />
      <div className="min-h-screen bg-[#E5E5E5]">
        <div className="mx-auto max-w-screen-lg pb-64 md:px-12 md:pt-12">
          <h1 className="text-h1 mb-10 text-center  underline">Style Guide</h1>
          <div className="mb-10">
            <h1 className="text-h2 ml-2">Change brand of Style Guide</h1>
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
