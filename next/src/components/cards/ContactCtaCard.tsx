import { Typography } from '@bratislava/component-library'
import React, { useMemo } from 'react'

import {
  AddressIcon,
  CityServicesIcon,
  EmailIcon,
  EuroIcon,
  MapIcon,
  OpeningHoursIcon,
  PersonIcon,
  PhoneIcon,
  PlaneIcon,
  WebIcon,
} from '@/src/assets/icons-contacts'
import MLink from '@/src/components/common/MLink/MLink'
import {
  ContactCardBlockFragment,
  ContactDirectionsCardBlockFragment,
  ContactPersonCardBlockFragment,
} from '@/src/services/graphql'
import cn from '@/src/utils/cn'
import { useTranslation } from '@/src/utils/useTranslation'

export enum ContactCtaCardType {
  Address = 'Address',
  OpeningHours = 'OpeningHours',
  Email = 'Email',
  Phone = 'Phone',
  Web = 'Web',
  PostalAddress = 'PostalAddress',
  BillingInfo = 'BillingInfo',
  BankConnection = 'BankConnection',
}

type ContactCtaCardProps = {
  className?: string
  contact:
    | ({ type: ContactCtaCardType } & ContactCardBlockFragment)
    | ({ type: 'Person' } & ContactPersonCardBlockFragment)
    | ({ type: 'Directions' } & ContactDirectionsCardBlockFragment)
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
      [ContactCtaCardType.PostalAddress]: t('ContactCtaCard.postalAddress'),
      [ContactCtaCardType.BillingInfo]: t('ContactCtaCard.billingInfo'),
      [ContactCtaCardType.BankConnection]: t('ContactCtaCard.bankConnection'),
      Directions: t('ContactCtaCard.directions'),
    }[contact.type]
  }, [contact, t])

  // eslint-disable-next-line sonarjs/cognitive-complexity
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
      return { icon: OpeningHoursIcon, displayValue: contact.value }
    }

    if (contact.type === ContactCtaCardType.PostalAddress) {
      return { icon: PlaneIcon, displayValue: contact.value }
    }

    if (contact.type === ContactCtaCardType.BillingInfo) {
      return { icon: CityServicesIcon, displayValue: contact.value }
    }

    if (contact.type === ContactCtaCardType.BankConnection) {
      return { icon: EuroIcon, displayValue: contact.value }
    }

    if (contact.type === 'Person') {
      return {
        icon: PersonIcon,
        displayComponent: (
          <div className="flex flex-col gap-1">
            {contact.email ? (
              <MLink href={`mailto:${contact.email}`} variant="underlined">
                {contact.email}
              </MLink>
            ) : null}
            {contact.phone ? (
              <MLink href={`tel:${contact.phone?.replaceAll(/\s+/g, '')}`} variant="underlined">
                {contact.phone}
              </MLink>
            ) : null}
            {contact.subtext ? <Typography variant="p-small">{contact.subtext}</Typography> : null}
          </div>
        ),
      }
    }

    if (contact.type === 'Directions') {
      return {
        icon: MapIcon,
        displayComponent: (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <Typography variant="p-small">{contact.address}</Typography>
              {contact.parkingInfo ? (
                <Typography variant="p-small">{contact.parkingInfo}</Typography>
              ) : null}
              {contact.publicTransportInfo ? (
                <Typography variant="p-small">{contact.publicTransportInfo}</Typography>
              ) : null}
              {contact.barrierFreeInfo ? (
                <Typography variant="p-small">{contact.barrierFreeInfo}</Typography>
              ) : null}
            </div>
            {contact.iframeUrl ? (
              <div className="aspect-video">
                <iframe
                  title={t('ContactCtaCard.directions.iframeTitle')}
                  src={contact.iframeUrl}
                  className="h-full w-full border"
                  allow="geolocation *"
                  // This should prevent iframes to collect cookies. Otherwise, they collect their cookies we don't have consent for.
                  // It may not work if the iframe needs some necessary cookies, or it may block some iframe to render at all.
                  // But it seems to work for all of our iframes so far.
                  // https://stackoverflow.com/questions/44837450/recommended-method-to-prevent-any-content-inside-iframe-from-setting-cookies
                  sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-forms"
                />
              </div>
            ) : null}
          </div>
        ),
      }
    }

    return null
  }, [contact, t])

  if (!data) {
    return null
  }

  const Icon = data.icon

  return (
    <div className={cn('relative flex max-w-180 items-start gap-4', className)}>
      <div className="flex shrink-0 items-center justify-center rounded-full text-gray-700">
        <Icon className="size-6 lg:size-8" />
      </div>
      <div
        // margin and padding added to show full focus ring
        className="-m-2 flex w-full flex-col gap-1 overflow-hidden p-2 wrap-break-word"
      >
        <Typography variant="h6" as="p" className="font-semibold">
          {label}
        </Typography>
        {data.displayComponent ||
          (data.link ? (
            <MLink href={data.link} variant="underlined">
              {data.displayValue}
            </MLink>
          ) : (
            <Typography variant="p-small">{data.displayValue}</Typography>
          ))}
      </div>
    </div>
  )
}

export default ContactCtaCard
