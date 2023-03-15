type ErrorIconProps = {
  solid?: boolean
  className?: string
}

const ErrorIcon = ({ solid = false, className }: ErrorIconProps) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_10_228)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 23.13C5.86 23.13 0.869995 18.14 0.869995 12C0.869995 5.86 5.86 0.869995 12 0.869995C18.14 0.869995 23.13 5.86 23.13 12C23.13 18.14 18.14 23.13 12 23.13ZM12 2.38C6.69 2.37 2.37 6.69 2.37 12C2.37 17.31 6.69 21.63 12 21.63C17.31 21.63 21.63 17.31 21.63 12C21.63 6.69 17.31 2.37 12 2.37V2.38ZM12 17.16C11.38 17.16 10.87 16.65 10.87 16.03C10.87 15.41 11.38 14.9 12 14.9C12.62 14.9 13.13 15.41 13.13 16.03C13.13 16.65 12.62 17.16 12 17.16ZM11.25 6.61H12.75V13.25H11.25V6.61Z"
          fill={solid ? 'white' : 'rgb(var(--color-negative-700))'}
        />
      </g>
      <defs>
        <clipPath id="clip0_10_228">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default ErrorIcon
