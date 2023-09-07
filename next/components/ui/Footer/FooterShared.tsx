import { FacebookIcon, InstagramIcon } from '@assets/images'
import { FooterColumnBlockFragment, FooterFragment } from '@backend/graphql'
import MLink from '@components/forms/simple-components/MLink'
import { useLocalizations } from '@components/providers/LocalizationsProvider'
import { getCommonLinkProps } from '@utils/getCommonLinkProps'
import { isDefined } from '@utils/isDefined'
import { useTranslations } from 'next-intl'
import * as React from 'react'

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
      {address && <p className="whitespace-pre-wrap">{address}</p>}
      <div className="flex flex-col gap-y-3">
        {contacts.map((contactItem) => (
          <div>
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
        innovations: (chunks) => (
          <MLink variant="underlined" {...getCommonLinkProps(innovationsLink)} />
        ),
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
            {otherLanguage.longName}
          </MLink>
          <span>/</span>
        </>
      )}
      <span className="font-semibold">{currentLanguage.longName}</span>
    </>
  )
}
