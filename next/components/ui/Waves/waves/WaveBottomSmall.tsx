import { WaveProps } from '../Waves'

const WaveBottom = ({ isRich = false, waveColor, outerLinesColor, innerLinesColor, className }: WaveProps) => (
  <svg
    className={className}
    style={{ backgroundColor: 'transparent' }}
    width="750"
    height="42"
    viewBox="0 0 750 42"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g style={{ color: outerLinesColor }} clipPath="url(#clip0_11749_315983)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M187.876 -43.9165H0V12.3337C23.6549 12.3337 35.5254 16.5412 47.316 20.727L47.3436 20.7368C59.0174 24.8811 70.6204 29.0003 93.8941 29.0003C117.168 29.0003 128.785 24.8811 140.472 20.7366L140.5 20.7269C152.304 16.5412 164.188 12.3337 187.843 12.3337C187.854 12.3337 187.865 12.3337 187.876 12.3337V-43.9165Z"
        fill={waveColor}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M562.625 -43.9165H374.75V12.3337C398.405 12.3337 410.275 16.5412 422.066 20.727L422.093 20.7368C433.767 24.8811 445.37 29.0003 468.644 29.0003C491.918 29.0003 503.534 24.8811 515.222 20.7366L515.25 20.7269C527.054 16.5412 538.938 12.3337 562.593 12.3337C562.604 12.3337 562.615 12.3337 562.625 12.3337V-43.9165Z"
        fill={waveColor}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M375.25 -43.9165H187.375V12.3337C211.03 12.3337 222.9 16.5412 234.691 20.727L234.718 20.7368C246.392 24.8811 257.995 29.0003 281.269 29.0003C304.543 29.0003 316.159 24.8811 327.847 20.7366L327.875 20.7269C339.679 16.5412 351.563 12.3337 375.218 12.3337C375.229 12.3337 375.24 12.3337 375.25 12.3337V-43.9165Z"
        fill={waveColor}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M750 -43.9165H562.125V12.3337C585.779 12.3337 597.65 16.5412 609.441 20.727L609.468 20.7368C621.142 24.8811 632.745 29.0003 656.019 29.0003C679.292 29.0003 690.909 24.8811 702.597 20.7366L702.624 20.7269C714.429 16.5412 726.313 12.3337 749.967 12.3337C749.978 12.3337 749.989 12.3337 750 12.3337V-43.9165Z"
        fill={waveColor}
      />
    </g>
    {isRich && (
      <g clipPath="url(#clip1_11749_315983)">
        <path
          d="M210.385 24.3745C210.385 24.3745 174.188 18.9056 148.146 29.5829C122.37 40.1512 98.4063 39.9994 98.4063 39.9994"
          stroke={waveColor}
          strokeWidth="2.08333"
          strokeLinecap="round"
        />
        <path
          d="M-18 2.5979C-18 2.5979 15.5938 -2.96929 48.9271 10.0519C99.629 29.858 141.635 9.7913 141.635 9.7913"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M679.135 17.0401C679.135 17.0401 642.938 22.5089 616.896 11.8317C591.12 1.26337 567.156 1.41513 567.156 1.41513"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M450.75 38.8167C450.75 38.8167 484.344 44.3838 517.677 31.3626C568.379 11.5566 610.385 31.6233 610.385 31.6233"
          stroke={waveColor}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
    )}
    <defs>
      <clipPath id="clip0_11749_315983">
        <rect width="750" height="29" fill="white" transform="matrix(1 0 0 -1 0 29)" />
      </clipPath>
      <clipPath id="clip1_11749_315983">
        <rect width="750" height="42" fill="white" transform="matrix(1 0 0 -1 0 42)" />
      </clipPath>
    </defs>
  </svg>
)

export default WaveBottom
