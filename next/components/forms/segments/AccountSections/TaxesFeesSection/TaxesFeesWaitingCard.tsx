import Icon from '@assets/images/account/mestske-konto-situacia-1-1.svg'

const TaxesFeesWaitingCard = () => {
  return (
    <div className="w-full max-w-screen-1.5lg m-auto mt-12 sm:mt-8 px-4 sm:px-16 py-10 flex flex-col lg:flex-row justify-around border-0 lg:border-2 border-gray-200 rounded-lg">
      <div className="flex justify-center">
        <Icon className="w-[146px] h-[144px] sm:w-[298px] sm:h-[296px]" />
      </div>
      <div className="flex flex-col max-w-none lg:max-w-[500px]">
        <span className="text-h4 mt-6 sm:mt-8 mb-2">Vašu daň z nehnuteľností pripravujeme.</span>
        <span className="text-p1">
          Aj v tomto momente pracujeme na výpočte dane z nehnuteľností až pre 200.000 daňovníkov.
          Pripravené rozhodnutia budeme distribuovať v termíne
          <span className="text-p1-semibold"> od 20. apríla do 30. mája.</span> Keď bude vaša daň z
          nehnuteľností pripravená, pošleme vám notifikačný e-mail.
        </span>
      </div>
    </div>
  )
}

export default TaxesFeesWaitingCard
