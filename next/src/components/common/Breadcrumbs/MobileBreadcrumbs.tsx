import { Button, Typography } from '@bratislava/component-library'

import type { BreadcrumbsProps } from '@/src/components/common/Breadcrumbs/Breadcrumbs'
import Disclosure from '@/src/components/common/Disclosure/Disclosure'
import DisclosureHeader from '@/src/components/common/Disclosure/DisclosureHeader'
import DisclosurePanel from '@/src/components/common/Disclosure/DisclosurePanel'
import HorizontalDivider from '@/src/components/common/Divider/HorizontalDivider'
import Icon from '@/src/components/common/Icon/Icon'
import MLink from '@/src/components/common/MLink/MLink'
import { useAdminGroupsContext } from '@/src/components/providers/AdminGroupsContextProvider'
import { isStarzAdminGroup, useGetSubmenuByAdminGroup } from '@/src/utils/adminGroupUtils'
import { getLinkProps } from '@/src/utils/getLinkProps'
import { isDefined } from '@/src/utils/isDefined'
import { useTranslation } from '@/src/utils/useTranslation'

const goBack = () => {
  window.history.back()
}

/**
 * Figma: https://www.figma.com/file/17wbd0MDQcMW9NbXl6UPs8/DS-ESBS%3A-Component-library?node-id=4316-6581&t=h4JAjB29v0Uizs8Y-0
 */
const MobileBreadcrumbs = ({ breadcrumbs }: BreadcrumbsProps) => {
  const { t } = useTranslation()
  const withHome = [{ title: t('Breadcrumbs.homepage'), path: '/' }, ...breadcrumbs]
  const withHomeWithoutCurrent = withHome.slice(0, -1)
  const last = withHomeWithoutCurrent.at(-1)
  const showDetails = withHomeWithoutCurrent.length > 0

  const { adminGroups } = useAdminGroupsContext()

  // TODO refactor when more adminGroups are implemented
  const starzAdminGroup = adminGroups.find((adminGroup) => isStarzAdminGroup(adminGroup))
  const showSubmenu = !!starzAdminGroup

  const { submenuPages } = useGetSubmenuByAdminGroup(starzAdminGroup)

  return (
    <div className="relative">
      <div className="flex justify-between">
        <div className="-mx-4 flex items-center gap-2 text-size-p-tiny font-medium">
          <Button
            onPress={goBack}
            variant="link"
            className="shrink-0 py-3 pl-4 text-[14px]"
            startIcon={<Icon name="chevron-right" className="shrink-0 rotate-180" />}
          >
            {t('Breadcrumbs.back')}
          </Button>
          <div className="h-4 w-px bg-border-passive-primary" />
          {last?.path ? (
            <MLink href={last.path} variant="underlined" aria-hidden className="truncate py-3 pr-4">
              {last.title}
            </MLink>
          ) : (
            <div className="truncate py-3 pr-4">{last?.title}</div>
          )}
        </div>
      </div>
      {showDetails && (
        <Disclosure>
          <DisclosureHeader className="absolute top-0 right-0 -mr-4 w-fit p-4 ring-inset" />
          <DisclosurePanel>
            {showSubmenu && (
              <>
                <div className="flex flex-col gap-4 py-4">
                  <Typography variant="h5">{t('MobileNavBar.submenu.title')}</Typography>
                  <ol className="flex flex-col gap-0.5">
                    {submenuPages.filter(isDefined).map((page, index) => {
                      const pageLinkProps = getLinkProps(page)

                      return (
                        <li className="text-size-p-tiny font-medium" key={index}>
                          <MLink variant="underlined" className="flex gap-2" {...pageLinkProps}>
                            <Icon name="arrow-right" className="size-5 shrink-0" />
                            {pageLinkProps.children}
                          </MLink>
                        </li>
                      )
                    })}
                  </ol>
                </div>
                <HorizontalDivider className="border-category-400" />
              </>
            )}
            <ol className="flex flex-col flex-wrap gap-1 py-4">
              {withHomeWithoutCurrent.map((breadcrumb, index) => (
                <li className="text-size-p-tiny font-medium" key={index}>
                  {breadcrumb.path ? (
                    <MLink href={breadcrumb.path} variant="underlined" className="flex gap-1">
                      <Icon name="chevron-right" className="size-5 shrink-0 rotate-180" />
                      {breadcrumb.title}
                    </MLink>
                  ) : (
                    <div className="flex gap-1">
                      <Icon name="chevron-right" className="size-5 shrink-0 rotate-180" />
                      {breadcrumb.title}
                    </div>
                  )}
                </li>
              ))}
            </ol>
          </DisclosurePanel>
        </Disclosure>
      )}
    </div>
  )
}

export default MobileBreadcrumbs
