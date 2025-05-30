import { Typography } from '@bratislava/component-library'
import React, { useMemo } from 'react'
import { PhoneIcon } from 'src/assets/icons'

import { AddressIcon, EmailIcon, WebIcon } from '@/src/assets/images'
import MLink from '@/src/components/common/MLink/MLink'
import { ContactCardBlockFragment } from '@/src/services/graphql'
import cn from '@/src/utils/cn'
import { useTranslation } from '@/src/utils/useTranslation'

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

/**
 * Figma: https://www.figma.com/file/17wbd0MDQcMW9NbXl6UPs8/DS-ESBS%3A-Component-library?type=design&node-id=8988-24516&t=ZrNmOvM307DSHwAu-0
 */
const ContactCtaCard = ({ className, contact, hasBackground }: ContactCtaCardProps) => {
  const { t } = useTranslation()

  const label = useMemo(() => {
    if (contact.overrideLabel) {
      return contact.overrideLabel
    }

    return {
      [ContactCtaCardType.Email]: t('ContactCtaCard.email'),
      [ContactCtaCardType.Phone]: t('ContactCtaCard.phone'),
      [ContactCtaCardType.Address]: t('ContactCtaCard.address'),
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

    return null
  }, [contact])

  if (!data) {
    return null
  }

  const Icon = data.icon

  return (
    <div
      className={cn(
        'relative flex flex-col gap-4 rounded-lg p-4 md:flex-row md:items-center lg:p-6',
        hasBackground ? 'bg-white' : 'bg-category-100',
        className,
      )}
    >
      <div
        className={cn(
          'flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-category-100 text-category-700 lg:h-[56px] lg:w-[56px]',
          hasBackground ? 'bg-category-100' : 'bg-white',
        )}
      >
        <Icon className="size-6 lg:size-8" />
      </div>
      <div className="flex flex-col gap-y-1 overflow-hidden break-words">
        {/* FIXME Typography. Convert to use Typograhpy component. Different font weight than Figma <p> */}
        <p className="text-h6 font-semibold">{label}</p>
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
