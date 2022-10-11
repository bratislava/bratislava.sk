import Tag from 'components/forms/Tag'
import { useState } from 'react'

import { Stack } from '../Stack'
import { Wrapper } from '../Wrapper'

interface TagShowCaseProps {

}

const TagShowCase = ({}: TagShowCaseProps) => {
  const [removableTag, setRemovableTag] = useState<string | null>("Real onRemove")

  return (
    <Wrapper direction="column" title="Tag">
      <p>WARNING: branded colors are automatically set from primary and secondary colors from tailwind config as its set brand </p>
      <Stack>
        <Tag text="Defaulttttttttttttttttttt"  />
        <Tag text="D"  />
        <Tag text="Default"  />
      </Stack>
      <Stack>
        <Tag text="Defaulttttttttttttttttttt"  size="large"/>
        <Tag text="D"  size="large"/>
        <Tag text="Default"  size="large"/>
      </Stack>
      <Stack>
        {
          removableTag &&
          <Tag text='Real onRemove' size="large"
               onRemove={() => setRemovableTag(null)} removable/>
        }
        <Tag text='Console.log onRemove' size="small"
             onRemove={() => console.log('\nTAG REMOVED\n')} removable/>
      </Stack>
      <Stack>
        <Tag text="Brandeeeeeeeeeeeeeeeed"  branded/>
        <Tag text="B"  branded/>
        <Tag text="Branded"  branded/>
      </Stack>
      <Stack>
        <Tag text="Brandeeeeeeeeeeeeeeeed"  size="large" branded/>
        <Tag text="B"  size="large" branded/>
        <Tag text="Branded"  size="large" branded/>
      </Stack>
      <Stack>
        <Tag text='Console.log onRemove' size="large"
               onRemove={() => console.log('\nTAG REMOVED\n')} removable branded/>
        <Tag text='Console.log onRemove' size="small"
             onRemove={() => console.log('\nTAG REMOVED\n')} removable branded/>
      </Stack>
    </Wrapper>
  )
}

export default TagShowCase
