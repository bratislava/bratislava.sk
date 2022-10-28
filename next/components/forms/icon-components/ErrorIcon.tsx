type ErrorIconProps = {
  solid?: boolean
  className?: string
}

const ErrorIcon = ({ solid = false, className }: ErrorIconProps) => {
  return (
    <svg
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M10 0C4.48 0 0 4.475 0 10C0 15.525 4.48 20 10 20C15.52 20 20 15.525 20 10C20 4.475 15.52 0 10 0ZM11 15H9V13H11V15ZM11 11H9V5H11V11Z"
        fill={solid ? 'white' : '#D00000'}
      />
    </svg>
  )
}

export default ErrorIcon
