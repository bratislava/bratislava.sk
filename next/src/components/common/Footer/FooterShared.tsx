import { Typography } from '@bratislava/component-library'
import { Trans } from 'next-i18next'
import * as React from 'react'

import { FacebookIcon, InstagramIcon } from '@/src/assets/images'
import MLink from '@/src/components/common/MLink/MLink'
import { useLocalizations } from '@/src/components/providers/LocalizationsProvider'
import { FooterColumnBlockFragment, FooterFragment } from '@/src/services/graphql'
import { getCommonLinkProps } from '@/src/utils/getCommonLinkProps'
import { isDefined } from '@/src/utils/isDefined'

export const FooterSocialLinks = ({ facebookUrl, instagramUrl }: FooterFragment) => {
  return (
    <>
      {facebookUrl && (
        <MLink href={facebookUrl} target="_blank" rel="noreferrer" className="p-2">
          <FacebookIcon className="size-5 md:size-6" />
        </MLink>
      )}
      {instagramUrl && (
        <MLink href={instagramUrl} target="_blank" rel="noreferrer" className="p-2">
          <InstagramIcon className="size-5 md:size-6" />
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
  return (
    <Trans
      i18nKey="Footer.copyright"
      components={{
        innovations: <MLink variant="underlined" {...getCommonLinkProps(innovationsLink)} />,
      }}
      values={{ year: new Date().getFullYear() }}
    />
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
