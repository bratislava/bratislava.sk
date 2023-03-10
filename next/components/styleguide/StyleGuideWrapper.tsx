import { CategoriesType, COLOR_VARIABLES, pageStyle } from '@utils/page'
import { ReactNode, useState } from 'react'
import * as React from 'react'

type BrandCategoryString =
  | 'Mesto Bratislava'
  | 'Doprava'
  | 'Zivotne prostredie'
  | 'Skolstvo'
  | 'Socialne sluzby'
  | 'Kultura'

interface Brand {
  color: CategoriesType
  category: BrandCategoryString
}

interface StyleGuideWrapperProps {
  children: ReactNode
}

const StyleGuideWrapper = ({ children }: StyleGuideWrapperProps) => {
  const [activeBrandColor, setActiveBrandColor] = useState<CategoriesType>('main')
  const allColors: Brand[] = [
    { color: 'main', category: 'Mesto Bratislava' },
    { color: 'transport', category: 'Doprava' },
    { color: 'environment', category: 'Zivotne prostredie' },
    { color: 'social', category: 'Skolstvo' },
    { color: 'education', category: 'Socialne sluzby' },
    { color: 'culture', category: 'Kultura' },
  ]

  const mapBrandColor = (brand: Brand, key: number) => {
    const colorVariable = COLOR_VARIABLES[brand.color]

    const styles = {
      color: activeBrandColor === brand.color ? 'white' : 'black',
      backgroundColor:
        activeBrandColor === brand.color
          ? `rgb(var(${colorVariable.c700}))`
          : `rgb(var(${colorVariable.c200}))`,
      border: `1px solid rgb(var(${colorVariable.c700}))`,
      transition: '0.125s linear all',
    }

    return (
      <button
        key={key}
        type="button"
        className="m-2 h-14 w-40 rounded-lg p-2 shadow-lg"
        style={styles}
        onClick={() => setActiveBrandColor(brand.color)}
      >
        {brand.category}
      </button>
    )
  }

  return (
    <main>
      <style
        dangerouslySetInnerHTML={{
          __html: pageStyle(activeBrandColor),
        }}
      />
      <div className="min-h-screen bg-[#E5E5E5]">
        <div className="mx-auto max-w-screen-lg md:px-12 md:pt-12 pb-64">
          <h1 className="text-h1 mb-10 text-center underline">Style Guide</h1>
          <div className="mb-10">
            <h1 className="text-h2 ml-2">Change brand of Style Guide</h1>
            <p className="ml-2">
              <b>WARNING:</b> Components should change automatically brand color scheme after we
              change colors in :root based on chosen brand. Click on button for change in styleguide
            </p>
            <div className="mt-3 flex-row flex-wrap gap-2">{allColors.map(mapBrandColor)}</div>
          </div>
          {children}
        </div>
      </div>
    </main>
  )
}

export default StyleGuideWrapper
