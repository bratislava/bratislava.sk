import { SearchIcon } from 'src/assets/icons'

import Button from '@/src/components/common/Button/Button'
import Brand from '@/src/components/common/Logos/Brand'
import MLink from '@/src/components/common/MLink/MLink'
import SkipToContentButton from '@/src/components/common/SkipToContentButton/SkipToContentButton'
import { useGeneralContext } from '@/src/components/providers/GeneralContextProvider'
import { useLocalizations } from '@/src/components/providers/LocalizationsProvider'
import cn from '@/src/utils/cn'
import { getCategoryColorLocalStyle } from '@/src/utils/colors'
import { getLinkProps } from '@/src/utils/getLinkProps'
import { isDefined } from '@/src/utils/isDefined'
import { useTranslation } from '@/src/utils/useTranslation'

type NavBarProps = { className?: string }

const Divider = ({ className }: { className?: string }) => {
  return <div aria-hidden className={`h-6 border-r ${className}`} />
}

const NavBarHeader = ({ className }: NavBarProps) => {
  const { t } = useTranslation()

  const { general } = useGeneralContext()
  const { header } = general ?? {}
  const { links, accountLink } = header ?? {}

  const { otherLanguage } = useLocalizations()

  return (
    <div
      className={cn('relative z-31 mx-auto bg-white px-4 lg:px-8', className)}
      style={getCategoryColorLocalStyle({ category: 'main' })}
    >
      <nav className="flex w-full items-center justify-between border-b border-grey-200 py-2">
        <SkipToContentButton />
        <Brand withTitle />

        <div className="flex h-full items-center gap-x-6">
          {links
            ?.filter(isDefined)
            .filter((link) => link.showOnDesktop)
            .map((link, linkIndex) => {
              return <MLink key={linkIndex} variant="underlined-medium" {...getLinkProps(link)} />
            })}

          {accountLink ? (
            <Button
              size="small"
              variant="outline"
              hasLinkIcon={false}
              data-cy="account-button"
              {...getLinkProps(accountLink)}
            />
          ) : (
            <Divider />
          )}

          <Button
            variant="icon-wrapped"
            data-cy="search-button"
            href={t('links.searchLink')}
            aria-label={t('SearchBar.search')}
            className="-m-4 p-4"
            hasLinkIcon={false}
            icon={<SearchIcon />}
          />

          <Divider />

          {otherLanguage && (
            <MLink
              variant="underlined-medium"
              href={otherLanguage.path}
              locale={otherLanguage.locale}
              data-cy="change-language-button"
            >
              {otherLanguage.longName}
            </MLink>
          )}
        </div>
      </nav>
    </div>
  )
}

export default NavBarHeader
