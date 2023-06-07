import {
  ContactsSectionFragment,
  Enum_Componentsectionscontactssection_Type,
} from '@backend/graphql'
import Markdown from '@components/atoms/Markdown'
import ContactCtaCard from '@components/molecules/presentation/ContactCtaCard'
import { isDefined } from '@utils/isDefined'
import cx from 'classnames'
import React from 'react'

type ContactsProps = {
  section: ContactsSectionFragment
}

const Contacts = ({ section }: ContactsProps) => {
  const isVertical = section.type === Enum_Componentsectionscontactssection_Type.Vertical
  const isHorizontal = section.type === Enum_Componentsectionscontactssection_Type.Horizontal

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
      <div
        className={cx(' col-span-1 flex flex-col gap-3', {
          'md:col-span-8': isVertical,
          'md:col-span-5': isHorizontal,
        })}
      >
        <h2 className="text-h2">{section.title}</h2>
        {section.description && <Markdown content={section.description} variant="small" />}
      </div>
      <div
        className={cx('hidden md:block', {
          'col-span-4': isVertical,
          'col-span-1': isHorizontal,
        })}
      />
      <div
        className={cx('col-span-1 grid grid-cols-1 gap-3 md:grid-cols-2', {
          'md:col-span-12': isVertical,
          'md:col-span-6': isHorizontal,
        })}
      >
        {section.contacts.filter(isDefined).map((contact) => (
          <ContactCtaCard
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
  )
}

export default Contacts
