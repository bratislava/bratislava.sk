import { AddressIcon, EmailIcon, PhoneIcon, WebIcon } from '@assets/ui-icons'
import { ContactCardBlockFragment } from '@backend/graphql'
import MLink from '@components/forms/simple-components/MLink'
import cx from 'classnames'
import { useTranslations } from 'next-intl'
import React, { useMemo } from 'react'
import { twMerge } from 'tailwind-merge'

export enum ContactCtaCardType {
  Address,
  Email,
  Phone,
  Web,
}

type ContactCtaCardProps = {
  className?: string
  contact: { type: ContactCtaCardType } & ContactCardBlockFragment
  hasBackground?: boolean
}
const ContactCtaCard = ({ className, contact, hasBackground }: ContactCtaCardProps) => {
  const t = useTranslations('ContactCtaCard')

  const label = useMemo(() => {
    if (contact.overrideLabel) {
      return contact.overrideLabel
    }
    return {
      [ContactCtaCardType.Email]: t('email'),
      [ContactCtaCardType.Phone]: t('phone'),
      [ContactCtaCardType.Address]: t('address'),
      [ContactCtaCardType.Web]: t('web'),
    }[contact.type]
  }, [contact, t])

  const data = useMemo(() => {
    if (contact.type === ContactCtaCardType.Phone) {
      return {
        icon: PhoneIcon,
        displayValue: contact.value,
        // Removes whitespaces
        link: `tel:${contact.value.replace(/\s+/g, '')}`,
      }
    }

    if (contact.type === ContactCtaCardType.Email) {
      return { icon: EmailIcon, displayValue: contact.value, link: `mailto:${contact.value}` }
    }

    if (contact.type === ContactCtaCardType.Web) {
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

    if (contact.type === ContactCtaCardType.Address) {
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
        'relative flex items-center gap-x-4 rounded-lg p-4 lg:p-6',
        hasBackground ? 'bg-white' : 'bg-category-100',
        className,
      )}
    >
      <div
        className={cx(
          'flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-category-100 text-category-700 lg:h-[56px] lg:w-[56px]',
          hasBackground ? 'bg-category-100' : 'bg-white',
        )}
      >
        <Icon className="h-6 w-6 lg:h-8 lg:w-8" />
      </div>
      <div className="flex flex-col gap-y-1 truncate">
        <p className="text-h6 font-semibold">{label}</p>
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
