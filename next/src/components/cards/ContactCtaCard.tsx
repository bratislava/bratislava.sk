import { Typography } from '@bratislava/component-library'
import React, { useMemo } from 'react'

import {
  AddressIcon,
  EmailIcon,
  OpeningHoursIcon,
  PersonIcon,
  PhoneIcon,
  WebIcon,
} from '@/src/assets/icons-contacts'
import MLink from '@/src/components/common/MLink/MLink'
import { ContactCardBlockFragment, ContactPersonCardBlockFragment } from '@/src/services/graphql'
import cn from '@/src/utils/cn'
import { isDefined } from '@/src/utils/isDefined'
import { useTranslation } from '@/src/utils/useTranslation'

export enum ContactCtaCardType {
  Address = 'Address',
  OpeningHours = 'OpeningHours',
  Email = 'Email',
  Phone = 'Phone',
  Web = 'Web',
}

type ContactCtaCardProps = {
  className?: string
  contact:
    | ({ type: 'Person' } & ContactPersonCardBlockFragment)
    | ({ type: ContactCtaCardType } & ContactCardBlockFragment)
}

/**
 * Figma: https://www.figma.com/file/17wbd0MDQcMW9NbXl6UPs8/DS-ESBS%3A-Component-library?type=design&node-id=8988-24516&t=ZrNmOvM307DSHwAu-0
 */
const ContactCtaCard = ({ className, contact }: ContactCtaCardProps) => {
  const { t } = useTranslation()

  const label = useMemo(() => {
    if (contact.type === 'Person') {
      return contact.title
    }

    if (contact.overrideLabel) {
      return contact.overrideLabel
    }

    return {
      [ContactCtaCardType.Email]: t('ContactCtaCard.email'),
      [ContactCtaCardType.Phone]: t('ContactCtaCard.phone'),
      [ContactCtaCardType.Address]: t('ContactCtaCard.address'),
      [ContactCtaCardType.OpeningHours]: t('ContactCtaCard.openingHours'),
      [ContactCtaCardType.Web]: t('ContactCtaCard.web'),
    }[contact.type]
  }, [contact, t])

  const data = useMemo(() => {
    if (contact.type === ContactCtaCardType.Phone) {
      return {
        icon: PhoneIcon,
        displayValue: contact.value,
        // Removes whitespaces
        link: `tel:${contact.value.replaceAll(/\s+/g, '')}`,
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

    if (contact.type === ContactCtaCardType.OpeningHours) {
      return { icon: OpeningHoursIcon, displayValue: contact.value.replaceAll('**', '') } // TODO remove replacing ** when it's cleaned in Strapi
    }

    if (contact.type === 'Person') {
      return {
        icon: PersonIcon,
        displayValue: [contact.subtext, contact.email, contact.phone].filter(isDefined).join('\n'), // TODO formatting, links
      }
    }

    return null
  }, [contact])

  if (!data) {
    return null
  }

  const Icon = data.icon

  return (
    <div className={cn('relative flex max-w-180 items-start gap-4', className)}>
      <div className="flex shrink-0 items-center justify-center rounded-full text-gray-700">
        <Icon className="size-6 lg:size-8" />
      </div>
      <div className="flex flex-col gap-1 overflow-hidden break-all">
        <Typography variant="h6" as="p" className="font-semibold">
          {label}
        </Typography>
        {data.link ? (
          <MLink href={data.link} variant="underlined">
            {data.displayValue}
          </MLink>
        ) : (
          <Typography variant="p-small" className="whitespace-pre-wrap">
            {data.displayValue}
          </Typography>
        )}
      </div>
    </div>
  )
}

export default ContactCtaCard
