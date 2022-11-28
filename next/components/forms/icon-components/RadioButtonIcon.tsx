import cx from 'classnames'

interface RadioButtonIconProps {
  selected?: boolean
  className?: string
}

const RadioButtonIcon = ({ selected, className }: RadioButtonIconProps) => {
  const radioButtonClassName = cx(
    "justify-align flex h-6 w-6 flex-col rounded-full border-2 border-form-black-default",
    className
  )

  return (
    <div className={radioButtonClassName}>
      {
        selected && <div className="m-auto h-4 w-4 rounded-full bg-form-black-default"/>
      }
    </div>
  )
}

export default RadioButtonIcon
