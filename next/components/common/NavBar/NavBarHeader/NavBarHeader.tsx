import { useTranslations } from 'next-intl'
import React from 'react'

import SearchIcon from '@/assets/images/search-icon.svg'
import Brand from '@/components/common/Brand/Brand'
import Button from '@/components/common/Button/Button'
import MLink from '@/components/common/MLink/MLink'
import SectionContainer from '@/components/common/SectionContainer/SectionContainer'
import SkipToContentButton from '@/components/common/SkipToContentButton/SkipToContentButton'
import { useGeneralContext } from '@/components/providers/GeneralContextProvider'
import { useLocalizations } from '@/components/providers/LocalizationsProvider'
import { getCategoryColorLocalStyle } from '@/utils/colors'
import { getCommonLinkProps } from '@/utils/getCommonLinkProps'
import { isDefined } from '@/utils/isDefined'
import { isExternalLink } from '@/utils/isExternalLink'

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
            <Button
              size="small"
              variant="category-solid"
              hasLinkIcon={false}
              data-cy="account-button"
              {...getCommonLinkProps(accountLink)}
            />
          ) : (
            <Divider />
          )}

          <MLink data-cy="search-button" href={t('searchLink')} className="-mx-4 p-4">
            <SearchIcon />
          </MLink>

          <Divider />

          {otherLanguage && (
            <MLink
              variant="underlined"
              href={otherLanguage.path}
              locale={otherLanguage.locale}
              data-cy="change-language-button"
            >
              {otherLanguage.longName}
            </MLink>
          )}
        </div>
      </nav>
    </SectionContainer>
  )
}

export default NavBarHeader
