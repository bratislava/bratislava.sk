type SuccessIconProps = {
  solid?: boolean
  className?: string
}

const SuccessIcon = ({ solid = false, className }: SuccessIconProps) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_10_244)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0.869995 12C0.869995 18.14 5.86 23.13 12 23.13C18.14 23.13 23.13 18.14 23.13 12C23.13 5.86 18.14 0.869995 12 0.869995C5.86 0.869995 0.869995 5.86 0.869995 12ZM2.37 12C2.37 6.69 6.69 2.37 12 2.38V2.37C17.31 2.37 21.63 6.69 21.63 12C21.63 17.31 17.31 21.63 12 21.63C6.69 21.63 2.37 17.31 2.37 12ZM7.12 12.05L10.87 15.84L17.36 9.31L16.29 8.25L10.87 13.71L8.18999 10.99L7.12 12.05Z"
          fill={solid ? 'white' : 'rgb(var(--color-success-700))'}
        />
      </g>
      <defs>
        <clipPath id="clip0_10_244">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default SuccessIcon
