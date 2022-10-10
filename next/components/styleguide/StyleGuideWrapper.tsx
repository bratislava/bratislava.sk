import { ReactNode } from 'react'
import { pageStyle } from '@utils/page'
import * as React from 'react'

interface StyleGuideWrapperProps {
  children: ReactNode
}

const StyleGuideWrapper = ({children}: StyleGuideWrapperProps) => {
  return (
    <main>
      <style
        dangerouslySetInnerHTML={{
          __html: pageStyle('blue'),
        }}
      />
      <div className="min-h-screen bg-[#E5E5E5]">
        <div className="mx-auto max-w-screen-lg px-12 pt-12 pb-64">
          {children}
        </div>
      </div>
    </main>
  )
}

export default StyleGuideWrapper
