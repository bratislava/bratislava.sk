import { BaTagGroup } from '@bratislava/component-library'
import React, { useState } from 'react'
import { Selection } from 'react-aria-components'

import { Stack } from '../Stack'
import { Wrapper } from '../Wrapper'

const TagGroupShowCase = () => {
  const [selectedDefault, setSelectedDefault] = useState<Selection>(new Set<string>())
  const [selectedDisabled, setSelectedDisabled] = useState<Selection>(new Set<string>())
  const [selectedMain, setSelectedMain] = useState<Selection>(new Set<string>())
  const [selectedEnv, setSelectedEnv] = useState<Selection>(new Set<string>())
  const [selectedTransport, setSelectedTransport] = useState<Selection>(new Set<string>())
  const [selectedSocial, setSelectedSocial] = useState<Selection>(new Set<string>())
  const [selectedEdu, setSelectedEdu] = useState<Selection>(new Set<string>())
  const [selectedCulture, setSelectedCulture] = useState<Selection>(new Set<string>())

  return (
    <Wrapper direction="column" title="Tag Group">
      <Stack>
        <BaTagGroup
          setTags={setSelectedDefault}
          selectedTags={selectedDefault}
          selectionMode="multiple"
          tagListClassName='flex gap-2'
          
          tags={[
            { id: '1', key: '1', size: 'large', label: 'Default' },
            { id: '2', key: '2', size: 'medium', label: 'Default' },
            { id: '3', key: '3', size: 'small', label: 'Default' },
          ]}
        />
      </Stack>

      <Stack>
        <BaTagGroup
          setTags={setSelectedDisabled}
          selectedTags={selectedDisabled}
          selectionMode="multiple"
          tagListClassName='flex gap-2'
          disabledTags={['4', '5', '6']}
          tags={[
            { id: '4', key: '4', size: 'large', label: 'Disabled', color: 'disabled' },
            { id: '5', key: '5', size: 'medium', label: 'Disabled', color: 'disabled' },
            { id: '6', key: '6', size: 'small', label: 'Disabled', color: 'disabled' },
          ]}
        />
      </Stack>

      <Stack>
        <BaTagGroup
          setTags={setSelectedMain}
          selectedTags={selectedMain}
          selectionMode="multiple"
          tagListClassName='flex gap-2'
          tags={[
            { id: '7', key: '7', size: 'large', label: 'Main', color: 'red' },
            { id: '8', key: '8', size: 'medium', label: 'Main', color: 'red' },
            { id: '9', key: '9', size: 'small', label: 'Main', color: 'red' },
          ]}
        />
      </Stack>

      <Stack>
        <BaTagGroup
          setTags={setSelectedEnv}
          selectedTags={selectedEnv}
          selectionMode="multiple"
          tagListClassName='flex gap-2'
          tags={[
            { id: '10', key: '10', size: 'large', label: 'Environment', color: 'green' },
            { id: '11', key: '11', size: 'medium', label: 'Environment', color: 'green' },
            { id: '12', key: '12', size: 'small', label: 'Environment', color: 'green' },
          ]}
        />
      </Stack>

      <Stack>
        <BaTagGroup
          setTags={setSelectedTransport}
          selectedTags={selectedTransport}
          selectionMode="multiple"
          tagListClassName='flex gap-2'
          tags={[
            { id: '13', key: '13', size: 'large', label: 'Transport', color: 'blue' },
            { id: '14', key: '14', size: 'medium', label: 'Transport', color: 'blue' },
            { id: '15', key: '15', size: 'small', label: 'Transport', color: 'blue' },
          ]}
        />
      </Stack>

      <Stack>
        <BaTagGroup
          setTags={setSelectedSocial}
          selectedTags={selectedSocial}
          selectionMode="multiple"
          tagListClassName='flex gap-2'
          tags={[
            { id: '16', key: '16', size: 'large', label: 'Social', color: 'yellow' },
            { id: '17', key: '17', size: 'medium', label: 'Social', color: 'yellow' },
            { id: '18', key: '18', size: 'small', label: 'Social', color: 'yellow' },
          ]}
        />
      </Stack>

      <Stack>
        <BaTagGroup
          setTags={setSelectedEdu}
          defaultSelectedKeys="19"
          selectedTags={selectedEdu}
          selectionMode="multiple"
          tagListClassName='flex gap-2'
          tags={[
            { id: '19', key: '19', size: 'large', label: 'Education', color: 'purple' },
            { id: '20', key: '20', size: 'medium', label: 'Education', color: 'purple' },
            { id: '21', key: '21', size: 'small', label: 'Education', color: 'purple' },
          ]}
        />
      </Stack>

      <Stack>
        <BaTagGroup
          setTags={setSelectedCulture}
          selectedTags={selectedCulture}
          selectionMode="multiple"
          tagListClassName='flex gap-2'
          tags={[
            { id: '23', key: '22', size: 'large', label: 'Culture', color: 'brown' },
            { id: '24', key: '23', size: 'medium', label: 'Culture', color: 'brown' },
            { id: '25', key: '24', size: 'small', label: 'Culture', color: 'brown' },
          ]}
        />
      </Stack>
    </Wrapper>
  )
}

export default TagGroupShowCase
