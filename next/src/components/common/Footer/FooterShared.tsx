import { Typography } from '@bratislava/component-library'
import { Trans } from 'next-i18next'

import { FacebookIcon, InstagramIcon } from '@/src/assets/images'
import MLink from '@/src/components/common/MLink/MLink'
import Markdown from '@/src/components/formatting/Markdown/Markdown'
import { useLocalizations } from '@/src/components/providers/LocalizationsProvider'
import { FooterColumnBlockFragment, FooterFragment } from '@/src/services/graphql'
import { getLinkProps } from '@/src/utils/getLinkProps'
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

export const FooterContacts = ({ contactText }: FooterFragment) => {
  return (
    <div className="flex flex-col gap-x-6 gap-y-3">
      <Markdown variant="small" content={contactText} />
    </div>
  )
}

export const FooterAccessibilityLink = ({ accessibilityPageLink }: FooterFragment) => {
  return accessibilityPageLink ? (
    <MLink variant="underlined" {...getLinkProps(accessibilityPageLink)} />
  ) : null
}

export const FooterCopyright = ({ innovationsLink }: FooterFragment) => {
  return (
    <Trans
      i18nKey="Footer.copyright"
      components={{
        innovations: <MLink variant="underlined" {...getLinkProps(innovationsLink)} />,
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
        <MLink variant="underlined" {...getLinkProps(link)} key={index} />
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
