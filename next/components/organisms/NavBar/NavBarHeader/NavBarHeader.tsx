import SearchIcon from '@assets/images/search-icon.svg'
import { SectionContainer } from '@bratislava/ui-bratislava'
import { Brand } from '@bratislava/ui-bratislava/Brand/Brand'
import Button from '@components/forms/simple-components/Button'
import MLink from '@components/forms/simple-components/MLink'
import { useLocalizations } from '@components/providers/LocalizationsProvider'
import { getCategoryColorLocalStyle } from '@utils/colors'
import { useGeneralContext } from '@utils/generalContext'
import { getCommonLinkProps } from '@utils/getCommonLinkProps'
import { isDefined } from '@utils/isDefined'
import { isExternalLink } from '@utils/isExternalLink'
import SkipToContentButton from 'components/molecules/SkipToContentButton'
import { useTranslations } from 'next-intl'

import React from 'react'

type NavBarProps = { className?: string }

const Divider = ({ className }: { className?: string }) => {
  return <div aria-hidden className={`h-6 border-r ${className}`} />
}

const NavBarHeader = ({ className }: NavBarProps) => {
  const t = useTranslations()

  const { general } = useGeneralContext()
  const { header } = general?.data?.attributes ?? {}
  const { links, accountLink } = header ?? {}

  const { otherLanguage } = useLocalizations()

  return (
    <SectionContainer
      className="relative z-[31] bg-white"
      style={getCategoryColorLocalStyle({ category: 'main' })}
    >
      <nav className="flex w-full items-center justify-between border-b border-gray-200">
        <SkipToContentButton />
        <Brand className="group" url="/" withTitle />

        <div className="flex h-full items-center gap-x-6">
          {links
            ?.filter(isDefined)
            .filter((link) => link.showOnDesktop)
            .map((link, linkIndex) => {
              // TODO better approach to links
              const pageSlug = link.page?.data?.attributes?.slug
              if (pageSlug || link.url) {
                return (
                  <MLink
                    // eslint-disable-next-line react/no-array-index-key
                    key={linkIndex}
                    variant="underlined-medium"
                    href={pageSlug ? `/${pageSlug}` : link.url ?? '#'}
                    target={link.url && isExternalLink(link.url) ? '_blank' : undefined}
                  >
                    {link.label}
                  </MLink>
                )
              }
              return null
            })}

          {accountLink ? (
            <Button size="sm" variant="category" {...getCommonLinkProps(accountLink)} />
          ) : (
            <Divider />
          )}

          <MLink href={t('searchLink')} className="-mx-4 p-4">
            <SearchIcon />
          </MLink>

          <Divider />

          {otherLanguage && (
            <MLink variant="underlined" href={otherLanguage.path} locale={otherLanguage.locale}>
              {otherLanguage.longName}
            </MLink>
          )}
        </div>
      </nav>
    </SectionContainer>
  )
}

export default NavBarHeader
