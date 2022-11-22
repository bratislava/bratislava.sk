interface RadioButtonIconProps {
  selected?: boolean
}

const RadioButtonIcon = ({selected}: RadioButtonIconProps) => {
  return (
    <div className="justify-align flex h-6 w-6 flex-col rounded-full border-2 border-gray-700">
      {
        selected && <div className="m-auto h-4 w-4 rounded-full bg-gray-700"/>
      }
    </div>
  )
}

export default RadioButtonIcon
