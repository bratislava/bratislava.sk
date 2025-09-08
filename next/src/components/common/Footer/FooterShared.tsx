import { Typography } from '@bratislava/component-library'
import { Trans } from 'next-i18next'

import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TiktokIcon,
  YoutubeIcon,
} from '@/src/assets/icons-social-media'
import Button from '@/src/components/common/Button/Button'
import MLink from '@/src/components/common/MLink/MLink'
import Markdown from '@/src/components/formatting/Markdown/Markdown'
import { useLocalizations } from '@/src/components/providers/LocalizationsProvider'
import { FooterColumnBlockFragment, FooterFragment } from '@/src/services/graphql'
import { getLinkProps } from '@/src/utils/getLinkProps'
import { isDefined } from '@/src/utils/isDefined'

export const FooterSocialLinks = ({
  facebookUrl,
  instagramUrl,
  youtubeUrl,
  linkedinUrl,
  tiktokUrl,
}: FooterFragment) => {
  const socialLinks = [
    { url: facebookUrl, icon: <FacebookIcon />, ariaLabel: 'Facebook' },
    { url: instagramUrl, icon: <InstagramIcon />, ariaLabel: 'Instagram' },
    { url: youtubeUrl, icon: <YoutubeIcon />, ariaLabel: 'YouTube' },
    { url: linkedinUrl, icon: <LinkedinIcon />, ariaLabel: 'LinkedIn' },
    { url: tiktokUrl, icon: <TiktokIcon />, ariaLabel: 'TikTok' },
  ]

  return (
    <>
      {socialLinks
        .map(({ url, icon, ariaLabel }, index) => {
          if (!url) return null

          return (
            <Button
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              href={url}
              icon={icon}
              aria-label={ariaLabel}
              target="_blank"
              variant="icon-wrapped"
              rel="noreferrer"
              hasLinkIcon={false}
            />
          )
        })
        .filter(isDefined)}
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
            <Typography variant="p-small">{otherLanguage.longName}</Typography>
          </MLink>
          <span>/</span>
        </>
      )}
      <Typography variant="p-small" className="font-semibold">
        {currentLanguage.longName}
      </Typography>
    </>
  )
}
