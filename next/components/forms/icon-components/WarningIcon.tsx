type WarningIconProps = {
  solid?: boolean
  className?: string
}

const WarningIcon = ({ solid = false, className }: WarningIconProps) => {
  return (
    <svg
      width='22'
      height='19'
      viewBox='0 0 22 19'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path d='M0 19H22L11 0L0 19ZM12 16H10V14H12V16ZM12 12H10V8H12V12Z' fill={solid ? 'white' : '#E07B04'} />
    </svg>
  )
}

export default WarningIcon
