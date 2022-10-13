import ArrowRightIcon from '@assets/images/forms/arrow-right.svg'
import SearchIcon from '@assets/images/forms/search-icon.svg'

import Button from '../../forms/Button'
import { Stack } from '../Stack'
import { Wrapper } from '../Wrapper'


interface ButtonShowCaseProps {

}

const ButtonShowCase = ({}: ButtonShowCaseProps) => {
  return (
    <Wrapper direction="column" title="Button">
      <Stack>
        <Button text="Button" />
        <Button text="Button" size="sm" />
        <Button text="Button disabled" disabled />
        <Button text="Button disabled" size="sm" disabled />
      </Stack>
      <Stack>
        <Button text="Button" startIcon={<SearchIcon />} />
        <Button text="Button" endIcon={<ArrowRightIcon />} />
        <Button text="Button" startIcon={<SearchIcon />} endIcon={<ArrowRightIcon />} />
        <Button text="Button" size="sm" startIcon={<SearchIcon />} />
        <Button text="Button" size="sm" endIcon={<ArrowRightIcon />} />
        <Button text="Button" size="sm" startIcon={<SearchIcon />} endIcon={<ArrowRightIcon />} />
      </Stack>
      <Stack>
        <Button icon={<SearchIcon />} />
        <Button icon={<SearchIcon />} size="sm" />
        <Button icon={<SearchIcon />} disabled />
        <Button icon={<SearchIcon />} size="sm" disabled />
      </Stack>

      <Stack>
        <Button variant="brand-outline" text="Button" />
        <Button variant="brand-outline" text="Button" size="sm" />
        <Button variant="brand-outline" text="Button disabled" disabled />
        <Button variant="brand-outline" text="Button disabled" size="sm" disabled />
      </Stack>
      <Stack>
        <Button variant="brand-outline" text="Button" startIcon={<SearchIcon />} />
        <Button variant="brand-outline" text="Button" endIcon={<ArrowRightIcon />} />
        <Button variant="brand-outline" text="Button" startIcon={<SearchIcon />} endIcon={<ArrowRightIcon />} />
        <Button variant="brand-outline" text="Button" size="sm" startIcon={<SearchIcon />} />
        <Button variant="brand-outline" text="Button" size="sm" endIcon={<ArrowRightIcon />} />
        <Button
          variant="brand-outline"
          text="Button"
          size="sm"
          startIcon={<SearchIcon />}
          endIcon={<ArrowRightIcon />}
        />
      </Stack>
      <Stack>
        <Button variant="brand-outline" icon={<SearchIcon />} />
        <Button variant="brand-outline" icon={<SearchIcon />} size="sm" />
        <Button variant="brand-outline" icon={<SearchIcon />} disabled />
        <Button variant="brand-outline" icon={<SearchIcon />} size="sm" disabled />
      </Stack>

      <Stack>
        <Button variant="black" text="Button" />
        <Button variant="black" text="Button" size="sm" />
        <Button variant="black" text="Button disabled" disabled />
        <Button variant="black" text="Button disabled" size="sm" disabled />
      </Stack>
      <Stack>
        <Button variant="black" text="Button" startIcon={<SearchIcon />} />
        <Button variant="black" text="Button" endIcon={<ArrowRightIcon />} />
        <Button variant="black" text="Button" startIcon={<SearchIcon />} endIcon={<ArrowRightIcon />} />
        <Button variant="black" text="Button" size="sm" startIcon={<SearchIcon />} />
        <Button variant="black" text="Button" size="sm" endIcon={<ArrowRightIcon />} />
        <Button variant="black" text="Button" size="sm" startIcon={<SearchIcon />} endIcon={<ArrowRightIcon />} />
      </Stack>
      <Stack>
        <Button variant="black" icon={<SearchIcon />} />
        <Button variant="black" icon={<SearchIcon />} size="sm" />
        <Button variant="black" icon={<SearchIcon />} disabled />
        <Button variant="black" icon={<SearchIcon />} size="sm" disabled />
      </Stack>

      <Stack>
        <Button variant="black-outline" text="Button" />
        <Button variant="black-outline" text="Button" size="sm" />
        <Button variant="black-outline" text="Button disabled" disabled />
        <Button variant="black-outline" text="Button disabled" size="sm" disabled />
      </Stack>
      <Stack>
        <Button variant="black-outline" text="Button" startIcon={<SearchIcon />} />
        <Button variant="black-outline" text="Button" endIcon={<ArrowRightIcon />} />
        <Button variant="black-outline" text="Button" startIcon={<SearchIcon />} endIcon={<ArrowRightIcon />} />
        <Button variant="black-outline" text="Button" size="sm" startIcon={<SearchIcon />} />
        <Button variant="black-outline" text="Button" size="sm" endIcon={<ArrowRightIcon />} />
        <Button
          variant="black-outline"
          text="Button"
          size="sm"
          startIcon={<SearchIcon />}
          endIcon={<ArrowRightIcon />}
        />
      </Stack>
      <Stack>
        <Button variant="black-outline" icon={<SearchIcon />} />
        <Button variant="black-outline" icon={<SearchIcon />} size="sm" />
        <Button variant="black-outline" icon={<SearchIcon />} disabled />
        <Button variant="black-outline" icon={<SearchIcon />} size="sm" disabled />
      </Stack>

      <Stack>
        <Button variant="negative" text="Button" />
        <Button variant="negative" text="Button" size="sm" />
        <Button variant="negative" text="Button disabled" disabled />
        <Button variant="negative" text="Button disabled" size="sm" disabled />
      </Stack>
      <Stack>
        <Button variant="negative" text="Button" startIcon={<SearchIcon />} />
        <Button variant="negative" text="Button" endIcon={<ArrowRightIcon />} />
        <Button variant="negative" text="Button" startIcon={<SearchIcon />} endIcon={<ArrowRightIcon />} />
        <Button variant="negative" text="Button" size="sm" startIcon={<SearchIcon />} />
        <Button variant="negative" text="Button" size="sm" endIcon={<ArrowRightIcon />} />
        <Button
          variant="negative"
          text="Button"
          size="sm"
          startIcon={<SearchIcon />}
          endIcon={<ArrowRightIcon />}
        />
      </Stack>

      <Stack>
        <Button variant="plain-brand" text="Button" />
        <Button variant="plain-brand" text="Button" size="sm" />
        <Button variant="plain-brand" text="Button disabled" disabled />
        <Button variant="plain-brand" text="Button disabled" size="sm" disabled />
      </Stack>
      <Stack>
        <Button variant="plain-brand" icon={<SearchIcon />} />
        <Button variant="plain-brand" icon={<SearchIcon />} size="sm" />
        <Button variant="plain-brand" icon={<SearchIcon />} disabled />
        <Button variant="plain-brand" icon={<SearchIcon />} size="sm" disabled />
      </Stack>

      <Stack>
        <Button variant="plain-black" text="Button" />
        <Button variant="plain-black" text="Button" size="sm" />
        <Button variant="plain-black" text="Button disabled" disabled />
        <Button variant="plain-black" text="Button disabled" size="sm" disabled />
      </Stack>
      <Stack>
        <Button variant="plain-black" icon={<SearchIcon />} />
        <Button variant="plain-black" icon={<SearchIcon />} size="sm" />
        <Button variant="plain-black" icon={<SearchIcon />} disabled />
        <Button variant="plain-black" icon={<SearchIcon />} size="sm" disabled />
      </Stack>

      <Stack>
        <Button variant="plain-negative" text="Button" />
        <Button variant="plain-negative" text="Button" size="sm" />
        <Button variant="plain-negative" text="Button disabled" disabled />
        <Button variant="plain-negative" text="Button disabled" size="sm" disabled />
      </Stack>

      <Stack>
        <Button variant="link-brand" href="#" label="Label value" />
        <Button variant="link-brand" href="#" label="Label value" size="sm" />
      </Stack>
      <Stack>
        <Button variant="link-black" href="#" label="Label value" />
        <Button variant="link-black" href="#" label="Label value" size="sm" />
      </Stack>
    </Wrapper>
  )
}

export default ButtonShowCase
