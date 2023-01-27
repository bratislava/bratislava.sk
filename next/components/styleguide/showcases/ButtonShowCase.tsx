import ArrowRightIcon from '@assets/images/forms/arrow-right.svg'
import SearchIcon from '@assets/images/forms/search-icon-lg.svg'

import Button from '../../forms/simple-components/Button'
import { Stack } from '../Stack'
import { Wrapper } from '../Wrapper'

interface ButtonShowCaseProps {}

const ButtonShowCase = ({}: ButtonShowCaseProps) => {
  return (
    <Wrapper direction="column" title="Button">
      <Stack>
        <Button variant="category" icon={<SearchIcon />} />
        <Button variant="category" icon={<SearchIcon />} size="sm" />
        <Button variant="category" text="Button" />
        <Button variant="category" text="Button" size="sm" />
        <Button variant="category" text="Button disabled" disabled />
        <Button variant="category" text="Button disabled" size="sm" disabled />
      </Stack>
      <Stack>
        <Button
          startIcon={<SearchIcon />}
          endIcon={<ArrowRightIcon />}
          variant="category"
          text="Button"
        />
        <Button
          startIcon={<SearchIcon />}
          endIcon={<ArrowRightIcon />}
          variant="category"
          text="Button"
          size="sm"
        />
        <Button variant="category" text="Button disabled" disabled />
        <Button variant="category" text="Button disabled" size="sm" disabled />
      </Stack>
      <Stack>
        <Button variant="category-outline" text="Button" />
        <Button variant="category-outline" text="Button" size="sm" />
        <Button variant="category-outline" text="Button disabled" disabled />
        <Button variant="category-outline" text="Button disabled" size="sm" disabled />
      </Stack>
      <Stack>
        <Button variant="category-outline" text="Button" startIcon={<SearchIcon />} />
        <Button variant="category-outline" text="Button" endIcon={<ArrowRightIcon />} />
        <Button
          variant="category-outline"
          text="Button"
          startIcon={<SearchIcon />}
          endIcon={<ArrowRightIcon />}
        />
        <Button variant="category-outline" text="Button" size="sm" startIcon={<SearchIcon />} />
        <Button variant="category-outline" text="Button" size="sm" endIcon={<ArrowRightIcon />} />
        <Button
          variant="category-outline"
          text="Button"
          size="sm"
          startIcon={<SearchIcon />}
          endIcon={<ArrowRightIcon />}
        />
      </Stack>
      <Stack>
        <Button variant="category-outline" icon={<SearchIcon />} />
        <Button variant="category-outline" icon={<SearchIcon />} size="sm" />
        <Button variant="category-outline" icon={<SearchIcon />} disabled />
        <Button variant="category-outline" icon={<SearchIcon />} size="sm" disabled />
      </Stack>

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
        <Button variant="black-outline" text="Button" />
        <Button variant="black-outline" text="Button" size="sm" />
        <Button variant="black-outline" text="Button disabled" disabled />
        <Button variant="black-outline" text="Button disabled" size="sm" disabled />
      </Stack>
      <Stack>
        <Button variant="black-outline" text="Button" startIcon={<SearchIcon />} />
        <Button variant="black-outline" text="Button" endIcon={<ArrowRightIcon />} />
        <Button
          variant="black-outline"
          text="Button"
          startIcon={<SearchIcon />}
          endIcon={<ArrowRightIcon />}
        />
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
        <Button
          variant="negative"
          text="Button"
          startIcon={<SearchIcon />}
          endIcon={<ArrowRightIcon />}
        />
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
        <Button variant="plain-category" text="Button" />
        <Button variant="plain-category" text="Button" size="sm" />
        <Button variant="plain-category" text="Button disabled" disabled />
        <Button variant="plain-category" text="Button disabled" size="sm" disabled />
      </Stack>
      <Stack>
        <Button variant="plain-category" icon={<SearchIcon />} />
        <Button variant="plain-category" icon={<SearchIcon />} size="sm" />
        <Button variant="plain-category" icon={<SearchIcon />} disabled />
        <Button variant="plain-category" icon={<SearchIcon />} size="sm" disabled />
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
        <Button variant="link-category" href="#" label="Label value" />
        <Button variant="link-category" href="#" label="Label value" size="sm" />
      </Stack>
      <Stack>
        <Button variant="link-black" href="#" label="Label value" />
        <Button variant="link-black" href="#" label="Label value" size="sm" />
      </Stack>
    </Wrapper>
  )
}

export default ButtonShowCase
