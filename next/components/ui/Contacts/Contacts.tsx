import { Typography } from '@bratislava/component-library'
import cx from 'classnames'
import React from 'react'

import {
  ContactCardBlockFragment,
  ContactsSectionFragment,
  Enum_Componentsectionscontactssection_Type,
} from '@/backend/graphql'
import Markdown from '@/components/atoms/Markdown'
import ContactCtaCard, {
  ContactCtaCardType,
} from '@/components/molecules/presentation/ContactCtaCard'
import { isDefined } from '@/utils/isDefined'

type ContactsProps = {
  section: ContactsSectionFragment
}

const mapSection = (
  array: (ContactCardBlockFragment | null | undefined)[] | null | undefined,
  type: ContactCtaCardType,
) => array?.filter(isDefined).map((contact) => ({ type, ...contact })) ?? []

/**
 * Figma: https://www.figma.com/file/17wbd0MDQcMW9NbXl6UPs8/DS-ESBS%3A-Component-library?type=design&node-id=8988-24516&t=ZrNmOvM307DSHwAu-0
 */
const Contacts = ({ section }: ContactsProps) => {
  const isVertical = section.type === Enum_Componentsectionscontactssection_Type.Vertical
  const isHorizontal = section.type === Enum_Componentsectionscontactssection_Type.Horizontal
  const contacts = [
    ...mapSection(section.addressContacts, ContactCtaCardType.Address),
    ...mapSection(section.emailContacts, ContactCtaCardType.Email),
    ...mapSection(section.phoneContacts, ContactCtaCardType.Phone),
    ...mapSection(section.webContacts, ContactCtaCardType.Web),
  ]

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8">
      <div
        className={cx('col-span-1 flex flex-col gap-3', {
          'md:col-span-8': isVertical,
          'md:col-span-5': isHorizontal,
        })}
      >
        <Typography type="h2">{section.title}</Typography>
        {section.description && <Markdown content={section.description} variant="small-no-respo" />}
      </div>
      <div
        className={cx('hidden md:block', {
          'col-span-4': isVertical,
          'col-span-1': isHorizontal,
        })}
      />
      <div
        className={cx('col-span-1', {
          'md:col-span-12': isVertical,
          'md:col-span-6': isHorizontal,
        })}
      >
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-3">
          {contacts.map((contact, index) => (
            <ContactCtaCard
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              className={cx('col-span-1', {
                'md:col-span-1': isVertical,
                'md:col-span-2': isHorizontal,
              })}
              contact={contact}
              hasBackground={section.hasBackground ?? false}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Contacts
