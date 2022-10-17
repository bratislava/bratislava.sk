type InfoIconProps = {
  solid?: boolean
  className?: string
}

const InfoIcon = ({ solid = false, className }: InfoIconProps) => {
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
        d="M10 0C4.475 0 0 4.475 0 10C0 15.525 4.475 20 10 20C15.525 20 20 15.525 20 10C20 4.475 15.525 0 10 0ZM11 15H9V9H11V15ZM11 7H9V5H11V7Z"
        fill={solid ? 'white' : '#333333'}
      />
    </svg>
  )
}

export default InfoIcon