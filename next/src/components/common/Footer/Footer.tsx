import DesktopFooter from '@/src/components/common/Footer/DesktopFooter'
import MobileFooter from '@/src/components/common/Footer/MobileFooter'

const Footer = () => {
  return (
    <>
      <div data-ai-crawl-exclude className="hidden lg:block">
        <DesktopFooter />
      </div>
      <div data-ai-crawl-exclude className="lg:hidden">
        <MobileFooter />
      </div>
    </>
  )
}

export default Footer
