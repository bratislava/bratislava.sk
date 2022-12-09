import { HomepageMenuIconSvgProps } from '@bratislava/ui-bratislava/HomepageMenu/HomepageMenuIcon'
import React from 'react'

const IconEnvironment = ({ isColored, color }: HomepageMenuIconSvgProps) => {
  const fillColor = isColored ? color : 'white'
  const strokeColor = isColored ? color : '#333333'

  return (
    <svg width="65" height="65" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_13527_46315)">
        <path
          d="M39.4844 42.7755V52.8855H43.7244V41.1055"
          stroke="#333333"
          strokeWidth="1.5"
          strokeMiterlimit="10"
        />
        <path
          d="M21.8945 26.6555C21.9582 26.2064 22.0757 25.7666 22.2445 25.3455C23.2445 22.9255 25.8345 21.5255 28.8445 21.5155C28.5261 19.6346 28.8802 17.7016 29.8445 16.0555C32.5045 11.6855 39.0545 10.8155 44.4645 14.1155C46.4449 15.2932 48.0825 16.9687 49.2145 18.9755C53.1545 17.6555 57.3145 19.2755 58.6545 22.7155C59.9945 26.1555 57.9445 30.2955 54.0245 31.9355C56.1245 34.3055 56.8845 37.1955 55.7045 39.4355C53.9945 42.6755 48.8545 43.3355 44.2345 40.8955L44.1245 40.8355C42.0314 42.2916 39.534 43.0541 36.9845 43.0155C35.8198 43.0171 34.6599 42.8658 33.5345 42.5655V33.4055L21.8945 26.6555Z"
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth="1.5"
          strokeMiterlimit="10"
        />
        <path
          d="M33.5238 52.885H10.0938V33.405L21.8138 26.625L33.5238 33.405V52.885Z"
          fill="white"
          stroke="#333333"
          strokeWidth="1.5"
          strokeMiterlimit="10"
        />
        <path
          d="M6.07422 35.735L21.8142 26.625"
          stroke="#333333"
          strokeWidth="1.5"
          strokeMiterlimit="10"
        />
        <path
          d="M37.5425 35.735L21.8125 26.625"
          stroke="#333333"
          strokeWidth="1.5"
          strokeMiterlimit="10"
        />
        <path
          d="M25.1648 43.2051H18.4648V52.8851H25.1648V43.2051Z"
          fill="white"
          stroke="#333333"
          strokeWidth="1.5"
          strokeMiterlimit="10"
        />
        <path
          d="M21.8148 38.7859C23.665 38.7859 25.1648 37.2861 25.1648 35.4359C25.1648 33.5858 23.665 32.0859 21.8148 32.0859C19.9647 32.0859 18.4648 33.5858 18.4648 35.4359C18.4648 37.2861 19.9647 38.7859 21.8148 38.7859Z"
          stroke="#333333"
          strokeWidth="1.5"
          strokeMiterlimit="10"
        />
        <path
          d="M13.0469 31.7053V24.1953H16.4069V29.7553L13.0469 31.7053Z"
          stroke="#333333"
          strokeWidth="1.5"
          strokeMiterlimit="10"
        />
        <path
          d="M21.8125 50.0059V46.0859"
          stroke="#333333"
          strokeWidth="1.5"
          strokeMiterlimit="10"
        />
      </g>
      <defs>
        <clipPath id="clip0_13527_46315">
          <rect width="64" height="64" fill="white" transform="translate(0.570312 0.5)" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default IconEnvironment
