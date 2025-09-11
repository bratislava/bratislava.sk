import React from 'react'

import { StarzLogoSvg } from '@/src/assets/images'
import Button from '@/src/components/common/Button/Button'
import MLink from '@/src/components/common/MLink/MLink'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import { AdminGroupEntityFragment } from '@/src/services/graphql'
import { getLinkProps } from '@/src/utils/getLinkProps'
import { isDefined } from '@/src/utils/isDefined'
import { useLocale } from '@/src/utils/useLocale'

type Props = {
  landingPage: NonNullable<AdminGroupEntityFragment['landingPage']>
}

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=18602-24983&m=dev
 *
 * Note that we use hardcoded Starz dark primary color for background and inverted color for text and logo
 *
 * TODO make it more generic in future when more organizations need it
 */
const StarzSubmenu = ({ landingPage }: Props) => {
  const locale = useLocale()

  // Strapi returns only other locales in localizations prop
  const localisedLandingPage =
    landingPage.locale === locale
      ? landingPage
      : landingPage.localizations.find((page) => page?.locale === locale)

  const childPages = localisedLandingPage?.childPages.filter(isDefined) ?? []

  const { children: ariaLabel, ...linkProps } = getLinkProps({ page: localisedLandingPage })

  // Beware of paddings, margins and gaps - they are used to enlarge clickable/touchable area of links, and they are carefully set to fit Figma design together
  return (
    <SectionContainer className="bg-starz-primary-700">
      <div className="flex gap-6">
        <div className="relative -m-2 self-center p-2">
          <MLink
            aria-label={ariaLabel}
            {...linkProps}
            className="text-content-active-primary-inverted-default transition hover:text-content-active-primary-inverted-hover active:text-content-active-primary-inverted-pressed"
            stretched
          >
            <StarzLogoSvg />
          </MLink>
        </div>
        <div className="my-4 border-l" aria-hidden />
        <div className="-ml-2 flex flex-wrap gap-2 py-2">
          {childPages.map((submenuPage) => (
            <Button
              key={submenuPage.documentId}
              variant="link-inverted"
              {...getLinkProps({ label: submenuPage.title, page: submenuPage })}
              className="px-2 py-3 font-normal no-underline hover:underline"
              hasLinkIcon={false}
            />
          ))}
        </div>
      </div>
    </SectionContainer>
  )
}

export default StarzSubmenu
