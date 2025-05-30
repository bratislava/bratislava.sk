import React from 'react'

import Contacts from '@/src/components/common/Contacts/Contacts'
import Stack from '@/src/components/styleguide/Stack'
import Wrapper from '@/src/components/styleguide/Wrapper'
import {
  ContactsSectionFragment,
  Enum_Componentsectionscontactssection_Type,
} from '@/src/services/graphql'

const data = {
  title: 'Kontakt',
  description:
    '**Lorem ipsum dolor sit amet consectetur.**\n In viverra elementum sem sed. Mi nunc eu gravida cursus purus turpis. Urna egestas aliquam ac suspendisse eleifend volutpat scelerisque. Et praesent adipiscing malesuada non lobortis magna duis.',
  hasBackground: true,
  phoneContacts: [
    {
      overrideLabel: null,
      value: '+421 2 5950 5950',
    },
  ],
  emailContacts: [
    {
      overrideLabel: null,
      value: 'sekretariat.gr@dpb.sk',
    },
  ],
  webContacts: [
    {
      overrideLabel: null,
      value: 'https://dpb.sk',
    },
  ],
  addressContacts: [
    {
      overrideLabel: null,
      value: 'Dopravný podnik Bratislava, a.s.\nOlejkárska 1\n814 52 Bratislava',
    },
    {
      overrideLabel: 'Override label test very very very very very very very very  long',
      value: 'Verylonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglong',
    },
  ],
}

const ContactsShowcase = () => {
  return (
    <Wrapper title="Banner">
      <Stack>
        <Contacts
          section={
            {
              ...data,
              type: Enum_Componentsectionscontactssection_Type.Vertical,
            } as ContactsSectionFragment
          }
        />
        <Contacts
          section={
            {
              ...data,
              type: Enum_Componentsectionscontactssection_Type.Horizontal,
            } as ContactsSectionFragment
          }
        />
        <Contacts
          section={
            {
              ...data,
              type: Enum_Componentsectionscontactssection_Type.Horizontal,
              hasBackground: false,
            } as ContactsSectionFragment
          }
        />
      </Stack>
    </Wrapper>
  )
}

export default ContactsShowcase
