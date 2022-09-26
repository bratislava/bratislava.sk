import Button from '../Button'
import SearchIcon from '../../../assets/images/search-icon.svg'

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
      <Button variant='link-black' href='/stackoverflow.com/' label='Link value'></Button>
      {/* <Button variant='link-brand' size='sm' href='https://stackoverflow.com/' label='Link value'></Button> */}
      <Button size="sm" icon={<SearchIcon />} variant="brand-outline"></Button>
      <Button text="Button" variant="black" size="sm"></Button>
      <Button icon={<SearchIcon />} variant="black-outline"></Button>
      <Button text="Button" variant="negative"></Button>
      <Button text="Button" variant="plain-brand"></Button>
      <Button text="Button" variant="plain-black" size="sm"></Button>
      <Button text="Button" variant="plain-negative"></Button>
    </div>
  )
}

export default ExampleInput
