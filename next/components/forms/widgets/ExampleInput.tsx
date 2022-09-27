// TODO types
export const ExampleInput = (props: any) => {
  return (
    <div>
      THIS IS AN EXAMPLE CUSTOM WIDGET
      <input
        type="text"
        className="custom"
        value={props.value}
        required={props.required}
        onChange={(event) => props.onChange(event.target.value)}
      />
    </div>
  )
}

export default ExampleInput
