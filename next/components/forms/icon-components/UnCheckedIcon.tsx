type ErrorIconProps = {
  className?: string
}

const UnCheckedIcon = ({ className }: ErrorIconProps) => {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M9.66668 1.27668L8.72334 0.333344L5.00001 4.05668L1.27668 0.333344L0.333344 1.27668L4.05668 5.00001L0.333344 8.72334L1.27668 9.66668L5.00001 5.94334L8.72334 9.66668L9.66668 8.72334L5.94334 5.00001L9.66668 1.27668Z"
        fill="white"
      />
    </svg>
  )
}

export default UnCheckedIcon
