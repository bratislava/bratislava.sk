type PersonIconProps = {
  className?: string
}

const PersonIcon = ({ className }: PersonIconProps) => {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M8 8C10.21 8 12 6.205 12 4C12 1.79 10.21 0 8 0C5.79 0 4 1.79 4 4C4 6.205 5.79 8 8 8ZM8 10C5.335 10 0 11.335 0 14V16H16V14C16 11.335 10.665 10 8 10Z" fill="#D83728"/>
    </svg>
  )
}

export default PersonIcon
