import { IconProps } from '@bratislava/ui-bratislava/WelcomeCard/WelcomeCardIcon'
import React from 'react'

const IconCity = ({ isColored, className }: IconProps) => {
  const fillColor = isColored ? 'rgb(var(--color-category-600))' : 'white'
  const strokeColor = isColored ? 'rgb(var(--color-category-600))' : '#333333'

  return (
    <svg
      width="65"
      height="65"
      viewBox="0 0 65 65"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M43.1409 19.4102V24.905H22.1704V19.4102H10.2812V26.4954V52.5001H55.041V26.4954V19.4102H43.1409Z"
        fill="white"
        stroke="#333333"
        strokeWidth="1.5"
        strokeMiterlimit="10"
      />
      <path
        d="M22.1704 19.4097H10.2812V18.3678L16.2258 12.5L22.1704 18.3678V19.4097Z"
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeMiterlimit="10"
      />
      <path d="M15.9727 27.9767V23.5566" stroke="#333333" strokeWidth="1.5" strokeMiterlimit="10" />
      <path d="M49.0859 27.9767V23.5566" stroke="#333333" strokeWidth="1.5" strokeMiterlimit="10" />
      <path d="M15.9727 37.9786V33.5586" stroke="#333333" strokeWidth="1.5" strokeMiterlimit="10" />
      <path d="M49.0859 37.9786V33.5586" stroke="#333333" strokeWidth="1.5" strokeMiterlimit="10" />
      <path d="M15.9727 47.9708V43.5508" stroke="#333333" strokeWidth="1.5" strokeMiterlimit="10" />
      <path d="M32.6562 37.9786V33.5586" stroke="#333333" strokeWidth="1.5" strokeMiterlimit="10" />
      <path d="M32.6562 47.9708V43.5508" stroke="#333333" strokeWidth="1.5" strokeMiterlimit="10" />
      <path d="M24.7031 37.9786V33.5586" stroke="#333333" strokeWidth="1.5" strokeMiterlimit="10" />
      <path d="M24.7031 47.9708V43.5508" stroke="#333333" strokeWidth="1.5" strokeMiterlimit="10" />
      <path d="M40.8711 37.9786V33.5586" stroke="#333333" strokeWidth="1.5" strokeMiterlimit="10" />
      <path d="M40.8711 47.9708V43.5508" stroke="#333333" strokeWidth="1.5" strokeMiterlimit="10" />
      <path d="M49.0859 47.9708V43.5508" stroke="#333333" strokeWidth="1.5" strokeMiterlimit="10" />
      <path
        d="M43.1424 24.9043H22.1719V29.8289H43.1424V24.9043Z"
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeMiterlimit="10"
      />
      <path
        d="M55.0407 19.4097V18.3678L49.0194 12.5L43.1406 18.3678V19.4097H55.0407Z"
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeMiterlimit="10"
      />
    </svg>
  )
}

export default IconCity
