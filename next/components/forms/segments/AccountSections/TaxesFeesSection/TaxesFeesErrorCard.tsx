import Icon from '@assets/images/account/mestske-konto-situacia-2-1.svg'
import AccountMarkdown from 'components/forms/segments/AccountMarkdown/AccountMarkdown'

type TaxesFeesErrorCardBase = {
  content?: string
}

const TaxesFeesErrorCard = ({ content }: TaxesFeesErrorCardBase) => {
  return (
    <div className="w-full max-w-screen-lg m-auto mt-0 lg:mt-8 px-4 md:px-16 pt-0 lg:py-10 flex flex-col lg:flex-row justify-around border-0 lg:border-2 border-gray-200 rounded-lg">
      <span className="flex justify-center">
        <Icon className="w-[145px] h-[140px] sm:w-[308px] sm:h-[296px]" />
      </span>
      <AccountMarkdown
        className="flex flex-col justify-center max-w-none lg:max-w-[500px] mt-6 md:mt-0"
        content={content}
      />
    </div>
  )
}

export default TaxesFeesErrorCard
