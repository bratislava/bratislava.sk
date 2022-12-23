type SuccessIconProps = {
  solid?: boolean
  className?: string
}

const SuccessIcon = ({ solid = false, className }: SuccessIconProps) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M10 0C4.475 0 0 4.475 0 10C0 15.52 4.475 20 10 20C15.52 20 20 15.52 20 10C20 4.475 15.52 0 10 0ZM8 15L3 10L4.415 8.585L8 12.17L15.585 4.585L17 6L8 15Z"
        fill={solid ? 'white' : '#01843D'}
      />
    </svg>
  )
}

export default SuccessIcon
