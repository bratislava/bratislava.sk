type WarningIconProps = {
  solid?: boolean
  className?: string
}

const WarningIcon = ({ solid = false, className }: WarningIconProps) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.52999 21.61H22.46C22.95 21.61 23.39 21.35 23.63 20.93C23.88 20.51 23.87 20 23.63 19.58L13.16 1.78C12.67 0.950001 11.33 0.950001 10.84 1.78L0.359993 19.58C0.119993 19.99 0.119993 20.51 0.359993 20.93C0.599993 21.36 1.03999 21.61 1.52999 21.61ZM22.2 20.11H1.79999L12 2.77L22.2 20.11ZM12.75 7.7H11.25V14.48H12.75V7.7ZM12 18.46C11.37 18.46 10.86 17.95 10.86 17.32C10.86 16.69 11.37 16.18 12 16.18C12.63 16.18 13.14 16.69 13.14 17.32C13.14 17.95 12.63 18.46 12 18.46Z"
        fill={solid ? 'white' : 'rgb(var(--color-warning-700))'}
      />
    </svg>
  )
}

export default WarningIcon
