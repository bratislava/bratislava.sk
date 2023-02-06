import Icon from '@assets/images/account/mestske-konto-situacia-2-1.svg'
import Link from 'next/link'

const TaxesFeesErrorCard = () => {
  return (
    <div className="w-full max-w-screen-1.5lg m-auto mt-2 sm:mt-8 p-8 sm:px-16 sm:py-24 flex justify-center border-0 lg:border-2 border-gray-200 rounded-lg">
      <div className="flex flex-col max-w-[592px] m-auto">
        <span className="flex justify-center">
          <Icon />
        </span>
        <span className="text-h4 mt-2 sm:mt-8 mb-3">
          Zatiaľ vás nevidíme v zozname daňovníkov a daňovníčok.
        </span>
        <span className="text-p2">Môže to tak byť, lebo:</span>
        <ul className="text-p2 list-disc pl-7">
          <li>vaša nehnuteľnosť je v spoluvlastníctve,</li>
          <li>vaše daňové priznanie ešte čaká na spracovanie,</li>
          <li>nie ste vlastníkom či vlastníčkou nehnuteľnosti,</li>
          <li>alebo ste nepodali priznanie k dani z nehnuteľností.</li>
        </ul>
        <span className="text-p2 mt-8">
          Viac informácií môžete nájsť v
          <Link href="/account/i-have-a-problem">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a className="text-p2-medium underline"> často kladených otázkach.</a>
          </Link>
        </span>
      </div>
    </div>
  )
}

export default TaxesFeesErrorCard
