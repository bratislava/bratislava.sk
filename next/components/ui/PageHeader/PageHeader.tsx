import cx from 'classnames'
import React, { useEffect, useState } from 'react'
import { useWindowSize } from 'rooks'

import { Waves, WavesProps } from '../Waves/Waves'

export interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  color: string
  transparentColor: string
  transparentColorMobile?: string
  imageSrc: string
  waves?: Omit<WavesProps, 'wavePosition'>
  smallScreenBreakPoint?: number
}

const defaultWaveProps = (color: string): WavesProps => ({
  wavePosition: 'top',
  waveColor: 'var(--background-color)',
  backgroundColor: 'transparent',
  innerLinesColor: color,
  isRich: true,
})

// TODO isn't ideal as we're just referencing tailwind config value - good enough for most uses
const DEFAULT_SMALL_SCREEN_BREAK_POINT = 768

export const PageHeader = ({
  className,
  children,
  color,
  transparentColor,
  transparentColorMobile,
  imageSrc,
  waves,
  smallScreenBreakPoint = DEFAULT_SMALL_SCREEN_BREAK_POINT,
  ...rest
}: PageHeaderProps) => {
  const [backgroundStyle, setBackgroundStyle] = useState<string[]>([])
  const { innerWidth } = useWindowSize()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Client-side-only code
      // TODO update the breakpoints for non-tax pages
      const newBackgroundStyle = []
      if (color && imageSrc)
        newBackgroundStyle.push(
          `linear-gradient(${innerWidth >= smallScreenBreakPoint ? '90deg' : '180deg'}, ${color}, ${
            innerWidth >= smallScreenBreakPoint
              ? `${color}, ${transparentColor})`
              : `${transparentColorMobile ?? transparentColor})`
          }`
        )
      if (imageSrc)
        newBackgroundStyle.push(
          `url(${imageSrc}) right ${innerWidth >= smallScreenBreakPoint ? 'center' : 'top/160%'} no-repeat`
        )
      if (color) newBackgroundStyle.push(color)

      setBackgroundStyle(newBackgroundStyle)
    }
  }, [imageSrc, color, innerWidth, transparentColor, smallScreenBreakPoint])
  return (
    <div
      // className={className}
      className={cx(className, 'header-main-bg bg-cover')}
      style={{
        boxSizing: 'border-box',
        backgroundSize: '100%',
        background: backgroundStyle.length > 0 ? backgroundStyle.join(', ') : 'var(--secondary-color)',
      }}
      {...rest}
    >
      {children}
      <Waves {...{ ...defaultWaveProps(color), ...waves }} />
    </div>
  )
}

export default PageHeader
