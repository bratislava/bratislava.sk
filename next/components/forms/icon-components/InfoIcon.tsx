type InfoIconProps = {
  solid?: boolean
  className?: string
}

const InfoIcon = ({ solid = false, className }: InfoIconProps) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_10_257)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 23.13C5.86 23.13 0.869995 18.14 0.869995 12C0.869995 5.86 5.86 0.869995 12 0.869995C18.14 0.869995 23.13 5.86 23.13 12C23.13 18.14 18.14 23.13 12 23.13ZM12 2.38C6.69 2.37 2.37 6.69 2.37 12C2.37 17.31 6.69 21.63 12 21.63C17.31 21.63 21.63 17.31 21.63 12C21.63 6.69 17.31 2.37 12 2.37V2.38ZM12 8.60999C11.38 8.60999 10.87 8.1 10.87 7.48C10.87 6.86 11.38 6.35 12 6.35C12.62 6.35 13.13 6.86 13.13 7.48C13.13 8.1 12.62 8.60999 12 8.60999ZM11.25 10.26H12.75V16.9H11.25V10.26Z"
          fill={solid ? 'white' : 'rgb(var(--color-gray-700))'}
        />
      </g>
      <defs>
        <clipPath id="clip0_10_257">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default InfoIcon
