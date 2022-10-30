import cx from 'classnames'
import { MouseEventHandler } from 'react'

type CloseIconProps = {
  type: 'error' | 'success' | 'info' | 'warning'
  className?: string
  solid?: boolean
  onClick?: MouseEventHandler<SVGSVGElement> | undefined
}

const CloseIcon = ({ className, solid = false,onClick, type = 'error' }: CloseIconProps) => {
  const closeIconStyle = cx('fill-current cursor-pointer', className, {
    'text-white': solid,
    'text-form-alert-error-default': type === 'error' && !solid,
    'text-form-alert-success-default': type === 'success' && !solid,
    'text-form-alert-info-default': type === 'info' && !solid,
    'text-form-alert-warning-default': type === 'warning' && !solid,
  })

  return (
    <svg
      onClick={onClick}
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={closeIconStyle}
    >
      <path d="M14 1.41502L12.585 2.09808e-05L7 5.58502L1.415 2.09808e-05L0 1.41502L5.585 7.00002L0 12.585L1.415 14L7 8.41502L12.585 14L14 12.585L8.415 7.00002L14 1.41502Z" />
    </svg>
  )
}

export default CloseIcon
