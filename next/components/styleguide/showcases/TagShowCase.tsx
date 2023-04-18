import Tag from 'components/forms/simple-components/Tag'

import { Stack } from '../Stack'
import { Wrapper } from '../Wrapper'

const TagShowCase = () => {
  return (
    <Wrapper direction="column" title="Tag">
      <div>
        WARNING: branded colors are automatically set from primary and secondary colors from
        tailwind config as its set brand{' '}
      </div>
      <Stack>
        <Tag text="Default" size="small" />
        <Tag text="Colored" size="small" isColored />
      </Stack>
      <Stack>
        <Tag text="Default" size="large" />
        <Tag text="Branded" size="large" isColored />
      </Stack>
      <Stack>
        <Tag
          text="console.log onRemove"
          size="small"
          onRemove={() => console.log('\nTAG REMOVED\n')}
        />
        <Tag
          text="console.log onRemove"
          size="large"
          onRemove={() => console.log('\nTAG REMOVED\n')}
        />
      </Stack>
    </Wrapper>
  )
}

export default TagShowCase
