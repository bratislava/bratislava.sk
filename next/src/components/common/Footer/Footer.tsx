import DesktopFooter from '@/src/components/common/Footer/DesktopFooter'
import MobileFooter from '@/src/components/common/Footer/MobileFooter'

const Footer = () => {
  return (
    <>
      <div className="hidden lg:block">
        <DesktopFooter />
      </div>
      <div className="lg:hidden">
        <MobileFooter />
      </div>
    </>
  )
}

export default Footer
