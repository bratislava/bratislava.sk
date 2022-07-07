import cx from 'classnames'

export interface CompleteDashedLineProps {
  className?: string
  color: string
}
export const CompleteDashedLine = ({ className, color }: CompleteDashedLineProps) => {
  return (
    <svg
      className={cx('absolute', className)}
      width="56"
      height="164"
      viewBox="0 0 56 164"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M27 163C27 163 1.5 148 1.5 123C1.5 98.4842 26.0219 83.5847 26.9717 83.0168C27.0019 82.9988 26.9974 83.0013 27.0293 82.9865C28.0339 82.5202 54.5 69.9653 54.5 41.5C54.5 19.5 27 1 27 1"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="8 8"
      />
    </svg>
  )
}
