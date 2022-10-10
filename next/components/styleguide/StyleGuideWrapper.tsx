import { COLOR_VARIABLES, pageStyle } from '@utils/page'
import { ReactNode, useState } from 'react'
import * as React from 'react'

type BrandColorString = 'red' | 'blue' | 'green' | 'yellow' | 'purple' | 'brown'
type BrandCategoryString = 'Mesto Bratislava' | 'Doprava' | 'Zivotne prostredie' | 'Skolstvo' | 'Socialne sluzby' | 'Kultura'

interface Brand {
  color: BrandColorString,
  category: BrandCategoryString
}

interface StyleGuideWrapperProps {
  children: ReactNode
}

const StyleGuideWrapper = ({children}: StyleGuideWrapperProps) => {
  const [activeBrandColor, setActiveBrandColor] = useState<BrandColorString>('red')
  const allColors: Brand[] = [
    { color: 'red', category: 'Mesto Bratislava' },
    { color: 'blue', category: 'Doprava' },
    { color: 'green', category: 'Zivotne prostredie' },
    { color: 'purple', category: 'Skolstvo' },
    { color: 'yellow', category: 'Socialne sluzby' },
    { color: 'brown', category: 'Kultura' },
  ]

  const mapBrandColor = (brand: Brand, key: number) => {
    const colorVariable = COLOR_VARIABLES[brand.color]

    const styles = {
      color: activeBrandColor === brand.color ? 'white' : 'black',
      backgroundColor: activeBrandColor === brand.color ? `rgb(var(${colorVariable.default}))` : `rgb(var(${colorVariable.light}))`,
      border: `1px solid rgb(var(${colorVariable.default}))`,
      transition: '0.125s linear all'
    }

    return (
      <button key={key} type="button"
              className="m-2 h-14 w-40 rounded-lg p-2 shadow-lg" style={styles}
              onClick={() => setActiveBrandColor(brand.color)}>
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
        <div className="mx-auto max-w-screen-lg px-12 pt-12 pb-64">
          <h1 className="mb-10 text-center text-xl font-bold underline">Style Guide</h1>
          <div className="mb-10">
            <h1 className="ml-2 text-lg">Change brand of style guide:</h1>
            <p className="ml-2"><b>WARNING:</b> Every component should change automatically brand color scheme after we change colors in :root based on chosen brand. Click on button for change in styleguide</p>
            <div className="flex-row flex-wrap gap-2">
            { allColors.map(mapBrandColor) }
            </div>
          </div>
          {children}
        </div>
      </div>
    </main>
  )
}

export default StyleGuideWrapper
