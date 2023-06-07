import { AddressIcon, EmailIcon, PhoneIcon, WebIcon } from '@assets/ui-icons'
import { ContactCardBlockFragment, Enum_Componentblockscontactcard_Type } from '@backend/graphql'
import MLink from '@components/forms/simple-components/MLink'
import { useTranslations } from 'next-intl'
import React, { useMemo } from 'react'
import { twMerge } from 'tailwind-merge'
import cx from 'classnames'

type ContactCtaCardProps = {
  className?: string
  contact: ContactCardBlockFragment
  hasBackground?: boolean
}
const ContactCtaCard = ({ className, contact, hasBackground }: ContactCtaCardProps) => {
  const t = useTranslations('ContactCtaCard')

  const label = useMemo(() => {
    if (contact.overrideLabel) {
      return contact.overrideLabel
    }
    return {
      [Enum_Componentblockscontactcard_Type.Email]: t('email'),
      [Enum_Componentblockscontactcard_Type.Phone]: t('phone'),
      [Enum_Componentblockscontactcard_Type.Address]: t('address'),
      [Enum_Componentblockscontactcard_Type.Website]: t('web'),
    }[contact.type]
  }, [contact, t])

  const data = useMemo(() => {
    if (contact.type === Enum_Componentblockscontactcard_Type.Phone) {
      return {
        icon: PhoneIcon,
        displayValue: contact.value,
        // Removes whitespaces
        link: `tel:${contact.value.replace(/\s+/g, '')}`,
      }
    }

    if (contact.type === Enum_Componentblockscontactcard_Type.Email) {
      return { icon: EmailIcon, displayValue: contact.value, link: `mailto:${contact.value}` }
    }

    if (contact.type === Enum_Componentblockscontactcard_Type.Website) {
      let displayValue = contact.value
      // Tries to parse the url and remove the protocol and trailing slash
      // https://www.bratislava.sk/ -> www.bratislava.sk
      try {
        const parsedUrl = new URL(contact.value)
        if (parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:') {
          displayValue = contact.value.replace(/^(http|https):\/\//, '').replace(/\/$/, '')
        }
        // eslint-disable-next-line no-empty
      } catch (error) {}

      return { icon: WebIcon, displayValue, link: contact.value }
    }

    if (contact.type === Enum_Componentblockscontactcard_Type.Address) {
      return { icon: AddressIcon, displayValue: contact.value }
    }

    return null
  }, [contact])

  if (!data) {
    return null
  }

  const Icon = data.icon

  return (
    <div
      className={twMerge(
        'relative flex items-center gap-x-4 rounded-lg p-6',
        hasBackground ? 'bg-white' : 'bg-category-100',
        className,
      )}
    >
      <div
        className={cx(
          'flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-full bg-category-100 text-category-700',
          hasBackground ? 'bg-category-100' : 'bg-white',
        )}
      >
        <Icon className="h-8 w-8" />
      </div>
      <div className="flex-col gap-y-1 truncate">
        <p className="font-semibold">{label}</p>
        {data.link ? (
          <MLink href={data.link} variant="underlined">
            {data.displayValue}
          </MLink>
        ) : (
          <span className="whitespace-pre-wrap">{data.displayValue}</span>
        )}
      </div>
    </div>
  )
}

export default ContactCtaCard
