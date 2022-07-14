import { WaveProps } from '../Waves'

const WaveTop = ({ isRich = false, waveColor, outerLinesColor, innerLinesColor, className }: WaveProps) => (
  <svg
    className={className}
    style={{ backgroundColor: 'transparent' }}
    width="750"
    height="42"
    viewBox="0 0 750 42"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g style={{ color: outerLinesColor }} clipPath="url(#clip0_11749_315984)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M96.8757 85.9165H-91V29.6663C-67.3451 29.6663 -55.4746 25.4588 -43.684 21.273L-43.6564 21.2632C-31.9826 17.1189 -20.3796 12.9997 2.89412 12.9997C26.168 12.9997 37.7847 17.1189 49.4725 21.2634L49.4999 21.2731C61.3041 25.4588 73.1882 29.6663 96.843 29.6663C96.8539 29.6663 96.8648 29.6663 96.8757 29.6663V85.9165Z"
        fill={waveColor}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M471.626 85.9165H283.75V29.6663C307.405 29.6663 319.275 25.4588 331.066 21.273L331.094 21.2632C342.767 17.1189 354.37 12.9997 377.644 12.9997C400.918 12.9997 412.535 17.1189 424.222 21.2634L424.25 21.2731C436.054 25.4588 447.938 29.6663 471.593 29.6663C471.604 29.6663 471.615 29.6663 471.626 29.6663V85.9165Z"
        fill={waveColor}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M284.251 85.9165H96.375V29.6663C120.03 29.6663 131.9 25.4588 143.691 21.273L143.719 21.2632C155.392 17.1189 166.995 12.9997 190.269 12.9997C213.543 12.9997 225.16 17.1189 236.847 21.2634L236.875 21.2731C248.679 25.4588 260.563 29.6663 284.218 29.6663C284.229 29.6663 284.24 29.6663 284.251 29.6663V85.9165Z"
        fill={waveColor}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M659.001 85.9165H471.125V29.6663C494.78 29.6663 506.65 25.4588 518.441 21.273L518.469 21.2632C530.142 17.1189 541.745 12.9997 565.019 12.9997C588.293 12.9997 599.91 17.1189 611.597 21.2634L611.625 21.2731C623.429 25.4588 635.313 29.6663 658.968 29.6663C658.979 29.6663 658.99 29.6663 659.001 29.6663V85.9165Z"
        fill={waveColor}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M846.001 85.9165H658.125V29.6663C681.78 29.6663 693.65 25.4588 705.441 21.273L705.469 21.2632C717.142 17.1189 728.745 12.9997 752.019 12.9997C775.293 12.9997 786.91 17.1189 798.597 21.2634L798.625 21.2731C810.429 25.4588 822.313 29.6663 845.968 29.6663C845.979 29.6663 845.99 29.6663 846.001 29.6663V85.9165Z"
        fill={waveColor}
      />
    </g>
    {isRich && (
      <g clipPath="url(#clip1_11749_315984)">
        <path
          d="M638.615 17.6255C638.615 17.6255 674.812 23.0944 700.854 12.4171C726.63 1.84882 750.594 2.00058 750.594 2.00058"
          stroke={waveColor}
          strokeWidth="2.08333"
          strokeLinecap="round"
        />
        <path
          d="M867 39.4021C867 39.4021 833.406 44.9693 800.073 31.9481C749.371 12.142 707.365 32.2087 707.365 32.2087"
          stroke={innerLinesColor}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M169.865 24.9599C169.865 24.9599 206.062 19.4911 232.104 30.1683C257.88 40.7366 281.844 40.5849 281.844 40.5849"
          stroke={innerLinesColor}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M398.25 3.18335C398.25 3.18335 364.656 -2.38385 331.323 10.6374C280.621 30.4434 238.615 10.3767 238.615 10.3767"
          stroke={waveColor}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
    )}
    <defs>
      <clipPath id="clip0_11749_315984">
        <rect width="750" height="29" fill={innerLinesColor} transform="translate(0 13)" />
      </clipPath>
      <clipPath id="clip1_11749_315984">
        <rect width="750" height="42" fill={innerLinesColor} transform="matrix(-1 0 0 1 750 0)" />
      </clipPath>
    </defs>
  </svg>
)

export default WaveTop
