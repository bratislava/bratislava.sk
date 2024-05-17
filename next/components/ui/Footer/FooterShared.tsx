import { Typography } from '@bratislava/component-library'
import MLink from '@components/forms/simple-components/MLink'
import { useLocalizations } from '@components/providers/LocalizationsProvider'
import { useTranslations } from 'next-intl'
import * as React from 'react'

import { FacebookIcon, InstagramIcon } from '@/assets/images'
import { FooterColumnBlockFragment, FooterFragment } from '@/backend/graphql'
import { getCommonLinkProps } from '@/utils/getCommonLinkProps'
import { isDefined } from '@/utils/isDefined'

export const FooterSocialLinks = ({ facebookUrl, instagramUrl }: FooterFragment) => {
  return (
    <>
      {facebookUrl && (
        <MLink href={facebookUrl} target="_blank" rel="noreferrer" className="p-2">
          <FacebookIcon className="h-5 w-5 md:h-6 md:w-6" />
        </MLink>
      )}
      {instagramUrl && (
        <MLink href={instagramUrl} target="_blank" rel="noreferrer" className="p-2">
          <InstagramIcon className="h-5 w-5 md:h-6 md:w-6" />
        </MLink>
      )}
    </>
  )
}

export const FooterContacts = ({ address, contacts }: FooterFragment) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-1">
      {address && (
        <Typography type="p" className="whitespace-pre-wrap">
          {address}
        </Typography>
      )}

      <div className="flex flex-col gap-y-3">
        {/* FIXME Typography. Convert to use Typography. */}
        {contacts?.filter(isDefined).map((contactItem, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index}>
            <span>{contactItem.label}: </span>
            {contactItem.phone && (
              <MLink href={`tel:${contactItem.phone.replace(/ /g, '')}`} variant="underlined">
                {contactItem.phone}
              </MLink>
            )}
            {contactItem.mail && (
              <MLink href={`mailto:${contactItem.mail}`} variant="underlined">
                {contactItem.mail}
              </MLink>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export const FooterAccessibilityLink = ({ accessibilityPageLink }: FooterFragment) => {
  return accessibilityPageLink ? (
    <MLink variant="underlined" {...getCommonLinkProps(accessibilityPageLink)} />
  ) : null
}

export const FooterCopyright = ({ innovationsLink }: FooterFragment) => {
  const t = useTranslations()

  return (
    <>
      {t.rich('Footer.copyright', {
        innovations: () => <MLink variant="underlined" {...getCommonLinkProps(innovationsLink)} />,
        year: new Date().getFullYear(),
      })}
    </>
  )
}

export const FooterColumnLinks = ({ links }: FooterColumnBlockFragment) => {
  return (
    <>
      {links?.filter(isDefined)?.map((link, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <MLink variant="underlined" {...getCommonLinkProps(link)} key={index} />
      ))}
    </>
  )
}

export const FooterLanguageSwitcher = () => {
  const { otherLanguage, currentLanguage } = useLocalizations()

  return (
    <>
      {otherLanguage && (
        <>
          <MLink href={otherLanguage.path} variant="underlined" locale={otherLanguage.locale}>
            <Typography type="p">{otherLanguage.longName}</Typography>
          </MLink>
          <span>/</span>
        </>
      )}
      <Typography type="span">{currentLanguage.longName}</Typography>
    </>
  )
}
