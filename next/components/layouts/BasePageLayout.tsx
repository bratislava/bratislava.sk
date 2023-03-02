import {
  BAStickyMenu,
  FooterProps,
  MenuMainItem,
  SectionContainer,
} from '@bratislava/ui-bratislava'
import cx from 'classnames'

import Footer from '../molecules/Footer'
import NavBar from '../molecules/NavBar'

interface BasePageLayoutProps {
  footer?: FooterProps
  menuItems?: MenuMainItem[]
  activeMenuItem?: string
  pageColor?: string
}

const BasePageLayout = ({
  className,
  children,
  footer,
  menuItems,
  activeMenuItem,
  pageColor,
}: React.HTMLAttributes<HTMLDivElement> & BasePageLayoutProps) => {
  return (
    <div className={cx('font-inter', className)}>
      <header>
        <div className="h-16 bg-white lg:h-14">
          <SectionContainer>
            <NavBar menuItems={menuItems ?? []} pageColor={pageColor} />
          </SectionContainer>
        </div>

        <div id="sticky-menu" className="lg:h-[106px]">
          <div className="fixed z-40 hidden w-full bg-white shadow-lg drop-shadow-sm lg:block ">
            <BAStickyMenu
              menuItems={menuItems ?? []}
              initialActiveMenuId={Number(activeMenuItem)}
            />
          </div>
        </div>
      </header>
      <div>{children}</div>
      {footer && <Footer {...footer} />}
    </div>
  )
}

export default BasePageLayout
