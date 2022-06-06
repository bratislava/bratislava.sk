import { WaveProps } from '../Waves';

const WaveBottom = ({
  isRich = false,
  waveColor,
  outerLinesColor,
  innerLinesColor,
  className,
}: WaveProps) => (
  <svg
    className={className}
    transform="rotate(180)"
    style={{ backgroundColor: innerLinesColor }}
    width="750"
    height="42"
    viewBox="0 0 750 42"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g style={{ color: outerLinesColor }} clipPath="url(#clip0_4200:47049)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M187.876 85.9165H0V29.6663C23.6549 29.6663 35.5254 25.4588 47.316 21.273L47.3436 21.2632C59.0174 17.1189 70.6204 12.9997 93.8941 12.9997C117.168 12.9997 128.785 17.1189 140.472 21.2634L140.5 21.2731C152.304 25.4588 164.188 29.6663 187.843 29.6663C187.854 29.6663 187.865 29.6663 187.876 29.6663V85.9165Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M562.626 85.9165H374.75V29.6663C398.405 29.6663 410.275 25.4588 422.066 21.273L422.094 21.2632C433.767 17.1189 445.37 12.9997 468.644 12.9997C491.918 12.9997 503.535 17.1189 515.222 21.2634L515.25 21.2731C527.054 25.4588 538.938 29.6663 562.593 29.6663C562.604 29.6663 562.615 29.6663 562.626 29.6663V85.9165Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M375.251 85.9165H187.375V29.6663C211.03 29.6663 222.9 25.4588 234.691 21.273L234.719 21.2632C246.392 17.1189 257.995 12.9997 281.269 12.9997C304.543 12.9997 316.16 17.1189 327.847 21.2634L327.875 21.2731C339.679 25.4588 351.563 29.6663 375.218 29.6663C375.229 29.6663 375.24 29.6663 375.251 29.6663V85.9165Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M750.001 85.9165H562.125V29.6663C585.78 29.6663 597.65 25.4588 609.441 21.273L609.469 21.2632C621.142 17.1189 632.745 12.9997 656.019 12.9997C679.293 12.9997 690.91 17.1189 702.597 21.2634L702.625 21.2731C714.429 25.4588 726.313 29.6663 749.968 29.6663C749.979 29.6663 749.99 29.6663 750.001 29.6663V85.9165Z"
        fill="currentColor"
      />
    </g>
    {isRich && (
      <g clipPath="url(#clip1_4200:47049)">
        <g style={{ color: outerLinesColor }}>
          {/* Wavelines - Outside (WaveColor) */}
          <path
            d="M210.386 17.6255C210.386 17.6255 174.188 23.0944 148.146 12.4171C122.37 1.84882 98.4066 2.00058 98.4066 2.00058"
            stroke="currentColor"
            strokeWidth="2.08333"
            strokeLinecap="round"
          />
          <path
            d="M450.75 3.18335C450.75 3.18335 484.344 -2.38385 517.677 10.6374C568.379 30.4434 610.385 10.3767 610.385 10.3767"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
        {/* Wavelines - Inside (LinesColor) */}
        <g style={{ color: innerLinesColor }}>
          <path
            d="M-18 39.4021C-18 39.4021 15.5938 44.9693 48.9271 31.9481C99.629 12.142 141.635 32.2087 141.635 32.2087"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M679.136 24.9599C679.136 24.9599 642.938 19.4911 616.896 30.1683C591.12 40.7366 567.157 40.5849 567.157 40.5849"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
      </g>
    )}
    <defs>
      <clipPath id="clip0_4200:47049">
        <rect
          width="750"
          height="29"
          fill="white"
          transform="translate(0 13)"
        />
      </clipPath>
      <clipPath id="clip1_4200:47049">
        <rect width="750" height="42" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default WaveBottom;
