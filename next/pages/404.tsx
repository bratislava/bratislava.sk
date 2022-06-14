import { Button } from '@bratislava/ui-bratislava/Button/Button'
import NoResultsIlustration from '../assets/images/no-results-small.svg'
import ChevronRight from '../assets/images/chevron-right.svg'
import { useUIContext } from '@bratislava/common-frontend-ui-context'

const NotFoundPage = () => {
  const { Link } = useUIContext()

  return (
    <div className="w-screen h-screen flex px-7 py-10 md:pl-36 md:pr-32 xl:pl-80 xl:pr-70">
      <div className="flex flex-col md:flex-row-reverse items-center md:justify-between w-full">
        <NoResultsIlustration />
        {/* text-5xl font-extrabold does not work */}
        <div className="flex flex-col items-center lg:items-start">
          <div className="text-[48px] lg:text-[64px] font-[800] pb-4">404</div>
          <div className="text-center lg:text-left lg:text-default max-w-xs pb-10">
            Ľutujeme, pre dané vyhľadávaniesa nenašli žiadne výsledky.
          </div>
          <Link href="/">
            <Button
              variant="transparent-black"
              className="text-default px-6 py-3"
              icon={<ChevronRight className="scale-75" />}
            >
              Na hlavnú stránku
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
