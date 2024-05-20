import cx from 'classnames'
import { MouseEventHandler } from 'react'

type CloseIconProps = {
  type: 'error' | 'success' | 'info' | 'warning'
  className?: string
  solid?: boolean
  onClick: MouseEventHandler<SVGSVGElement> | undefined
}

const CloseIcon = ({ className, solid = false, onClick, type = 'error' }: CloseIconProps) => {
  const closeIconStyle = cx('cursor-pointer fill-current', className, {
    'text-white': solid,
    'text-negative-700': type === 'error' && !solid,
    'text-success-700': type === 'success' && !solid,
    'text-gray-700': type === 'info' && !solid,
    'text-warning-700': type === 'warning' && !solid,
  })

  return (
    <svg
      onClick={onClick}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={closeIconStyle}
    >
      <path d="M20.84 4.22L19.78 3.16L12 10.94L4.22 3.16L3.16 4.22L10.94 12L3.16 19.78L4.22 20.84L12 13.06L19.78 20.84L20.84 19.78L13.06 12L20.84 4.22Z" />
    </svg>
  )
}

export default CloseIcon
