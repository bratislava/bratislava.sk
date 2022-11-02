interface RadioButtonIconProps {
  selected?: boolean
}

const RadioButtonIcon = ({selected}: RadioButtonIconProps) => {
  return (
    <div className="justify-align flex h-6 w-6 flex-col rounded-full border-2 border-form-black-default">
      {
        selected && <div className="m-auto h-4 w-4 rounded-full bg-form-black-default"/>
      }
    </div>
  )
}

export default RadioButtonIcon
