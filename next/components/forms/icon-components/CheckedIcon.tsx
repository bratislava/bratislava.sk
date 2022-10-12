type ErrorIconProps = {
  className?: string
}

const CheckedIcon = ({ className }: ErrorIconProps) => {
  return (
    <svg
      width="12"
      height="10"
      viewBox="0 0 12 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M4.00001 7.78003L1.22001 5.00002L0.276672 5.94336L4.00001 9.66669L12 1.66669L11.0567 0.723358L4.00001 7.78003Z"
        fill="white"
      />
    </svg>
  )
}

export default CheckedIcon
