import cx from 'classnames'

interface RadioButtonIconProps {
  selected?: boolean
  className?: string
}

const RadioButtonIcon = ({ selected, className }: RadioButtonIconProps) => {
  const radioButtonClassName = cx(
    'justify-align flex h-6 w-6 flex-col rounded-full border-2 border-gray-800',
    className,
  )

  return (
    <div className={radioButtonClassName}>
      {selected && <div className="m-auto h-4 w-4 rounded-full bg-gray-800" />}
    </div>
  )
}

export default RadioButtonIcon
