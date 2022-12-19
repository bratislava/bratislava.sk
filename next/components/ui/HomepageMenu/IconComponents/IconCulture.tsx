import { HomepageMenuIconSvgProps } from '@bratislava/ui-bratislava/HomepageMenu/HomepageMenuIcon'
import React from 'react'

const IconCulture = ({ isColored, color }: HomepageMenuIconSvgProps) => {
  const fillColor = isColored ? color : 'white'
  const strokeColor = isColored ? color : '#333333'

  return (
    <svg width="65" height="65" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_13527_46938)">
        <path
          d="M50.7055 49.791H19.1914V53.4991H50.7055V49.791Z"
          fill="white"
          stroke="#333333"
          strokeWidth="1.5"
          strokeMiterlimit="10"
        />
        <path d="M37.8633 31.4305H51.0904V28.6612L38.3327 24.3711" fill="white" />
        <path
          d="M37.8633 31.4305H51.0904V28.6612L38.3327 24.3711"
          stroke="#333333"
          strokeWidth="1.5"
          strokeMiterlimit="10"
        />
        <path
          d="M46.9887 40.7609V31.4297H42.8676V39.5218H42.8582V46.2151L41.4219 49.7918H48.425L46.9887 46.2151V40.7609Z"
          fill="white"
          stroke="#333333"
          strokeWidth="1.5"
          strokeMiterlimit="10"
        />
        <path
          d="M32.8777 38.9033V39.5229V46.2162L31.4414 49.7929H38.4445L37.0082 46.2162V40.7621V33.7871"
          fill="white"
        />
        <path
          d="M32.8777 38.9033V39.5229V46.2162L31.4414 49.7929H38.4445L37.0082 46.2162V40.7621V33.7871"
          stroke="#333333"
          strokeWidth="1.5"
          strokeMiterlimit="10"
        />
        <path
          d="M22.9011 41.1094V46.2162L21.4648 49.7929H28.468L27.0317 46.2162V42.2265"
          fill="white"
        />
        <path
          d="M22.9011 41.1094V46.2162L21.4648 49.7929H28.468L27.0317 46.2162V42.2265"
          stroke="#333333"
          strokeWidth="1.5"
          strokeMiterlimit="10"
        />
        <path
          d="M26.1381 11.5C30.2505 11.4965 34.3388 12.1298 38.2574 13.3775L38.3325 27.8438C38.3393 30.1716 37.7619 32.4639 36.6532 34.5107C35.5445 36.5575 33.94 38.2934 31.9865 39.5594L28.9543 41.5027C28.1521 42.0089 27.2228 42.2776 26.2742 42.2776C25.3255 42.2776 24.3963 42.0089 23.594 41.5027L20.5525 39.5688C18.5755 38.3266 16.9432 36.6064 15.8062 34.5671C14.6693 32.5277 14.0642 30.2349 14.0469 27.9001V13.4339C17.9548 12.1751 22.0325 11.5229 26.1381 11.5Z"
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth="1.5"
          strokeMiterlimit="10"
        />
        <path
          d="M21.8398 32.0781C23.0673 33.0948 24.6112 33.6511 26.2051 33.6511C27.7989 33.6511 29.3428 33.0948 30.5703 32.0781V32.0781"
          stroke="#333333"
          strokeWidth="1.5"
          strokeMiterlimit="10"
        />
        <path
          d="M24.2441 23.6943C22.6388 21.5915 20.3201 21.5915 18.7148 23.6943"
          stroke="#333333"
          strokeWidth="1.5"
          strokeMiterlimit="10"
        />
        <path
          d="M33.6933 23.6943C32.0881 21.5915 29.7599 21.5915 28.1641 23.6943"
          stroke="#333333"
          strokeWidth="1.5"
          strokeMiterlimit="10"
        />
      </g>
      <defs>
        <clipPath id="clip0_13527_46938">
          <rect width="64" height="64" fill="white" transform="translate(0.570312 0.5)" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default IconCulture
