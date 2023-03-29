import { IconProps } from '@bratislava/ui-bratislava/WelcomeCard/WelcomeCardIcon'
import React from 'react'

const IconEducation = ({ isColored, color }: IconProps) => {
  const fillColor = isColored ? color : 'white'
  const strokeColor = isColored ? color : '#333333'

  return (
    <svg width="65" height="65" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_13527_46629)">
        <path
          d="M39.9927 31.9399V18.5354L39.6317 18.3965H16.0628C14.0818 18.3965 12.4525 17.2024 12.4525 15.7305V44.2612C12.4429 44.3566 12.4429 44.4528 12.4525 44.5482C12.4525 45.2847 12.7451 45.9911 13.2659 46.512C13.7867 47.0328 14.4931 47.3254 15.2297 47.3254H37.6321L39.9927 31.9399Z"
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth="1.5"
          strokeMiterlimit="10"
        />
        <path
          d="M21.0156 23.498H32.2632"
          stroke="#333333"
          strokeWidth="1.5"
          strokeMiterlimit="10"
        />
        <path
          d="M18.4414 26.9785H34.9563"
          stroke="#333333"
          strokeWidth="1.5"
          strokeMiterlimit="10"
        />
        <path
          d="M39.1139 14.9529C39.0551 13.887 39.3372 12.83 39.9193 11.9351C40.0767 11.7407 39.9193 11.5 39.6046 11.5H16.0634C14.0824 11.5 12.4531 12.7034 12.4531 14.1753V15.7305C12.4531 17.2024 14.0824 18.3966 16.0634 18.3966H39.6046C39.9008 18.3966 40.0767 18.1652 39.9193 17.9708C39.3384 17.0754 39.0564 16.0188 39.1139 14.9529Z"
          fill="white"
          stroke="#333333"
          strokeWidth="1.5"
          strokeMiterlimit="10"
        />
        <path
          d="M28.5041 30.6445H24.7734"
          stroke="#333333"
          strokeWidth="1.5"
          strokeMiterlimit="10"
        />
        <path
          d="M44.2414 46.6582H44.3895C45.2887 46.657 46.1793 46.833 47.0103 47.1763C47.8414 47.5195 48.5966 48.0233 49.2329 48.6586C49.8691 49.294 50.3739 50.0486 50.7182 50.8792C51.0626 51.7098 51.2399 52.6001 51.2399 53.4993H29.5039C29.5039 51.6849 30.2247 49.9449 31.5076 48.6619C32.7906 47.379 34.5306 46.6582 36.345 46.6582H44.2414Z"
          fill="white"
          stroke="#333333"
          strokeWidth="1.5"
          strokeMiterlimit="10"
        />
        <path
          d="M46.8625 36.0508V41.4477C46.8625 43.1664 46.1797 44.8146 44.9645 46.0298C43.7492 47.2451 42.101 47.9278 40.3824 47.9278C38.6638 47.9278 37.0156 47.2451 35.8003 46.0298C34.5851 44.8146 33.9023 43.1664 33.9023 41.4477V36.0508H46.8625Z"
          fill="white"
          stroke="#333333"
          strokeWidth="1.5"
          strokeMiterlimit="10"
        />
        <path
          d="M43.1055 36.0508H52.696"
          stroke="#333333"
          strokeWidth="1.5"
          strokeMiterlimit="10"
        />
        <path
          d="M38.3281 42.5217V38.791"
          stroke="#333333"
          strokeWidth="1.5"
          strokeMiterlimit="10"
        />
        <path d="M42.418 42.5217V38.791" stroke="#333333" strokeWidth="1.5" strokeMiterlimit="10" />
        <path
          d="M33.8828 36.051V32.8665C33.8828 31.7706 34.3175 30.7195 35.0915 29.9438C35.8655 29.168 36.9157 28.731 38.0115 28.7285H42.7142C43.8117 28.7285 44.8642 29.1645 45.6402 29.9405C46.4162 30.7165 46.8522 31.769 46.8522 32.8665V36.051H33.8828Z"
          fill="white"
          stroke="#333333"
          strokeWidth="1.5"
          strokeMiterlimit="10"
        />
      </g>
      <defs>
        <clipPath id="clip0_13527_46629">
          <rect width="64" height="64" fill="white" transform="translate(0.570312 0.5)" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default IconEducation
