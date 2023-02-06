import Icon from '@assets/images/account/mestske-konto-situacia-1-1.svg'

const TaxesFeesWaitingCard = () => {
  return (
    <div className="w-full max-w-screen-1.5lg m-auto mt-2 sm:mt-8 p-8 sm:px-16 sm:py-24 flex flex-col items-center border-0 lg:border-2 border-gray-200 rounded-lg">
      <Icon />
      <span className="text-h4 mt-8 mb-3">Vašu daň z nehnuteľností pripravujeme.</span>
      <span className="text-p1 leading-7 text-left sm:text-center">
        Aj v tomto momente pracujeme na výpočte dane z nehnuteľností až pre 200.000 daňovníkov.
        Pripravené rozhodnutia budeme distribuovať v termíne
        <span className="text-p1-semibold"> od 20. apríla do 30. mája.</span> Keď bude vaša daň z
        nehnuteľností pripravená, pošleme vám notifikačný e-mail.
      </span>
    </div>
  )
}

export default TaxesFeesWaitingCard
