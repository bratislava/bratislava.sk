import Icon from '@assets/images/account/mestske-konto-situacia-1-1.svg'
import AccountMarkdown from 'components/forms/segments/AccountMarkdown/AccountMarkdown'

type TaxesFeesWaitingCardBase = {
  content?: string
}

const TaxesFeesWaitingCard = ({ content }: TaxesFeesWaitingCardBase) => {
  return (
    <div className="w-full max-w-screen-1.5lg m-auto mt-12 sm:mt-8 px-4 sm:px-16 py-10 flex flex-col lg:flex-row justify-around border-0 lg:border-2 border-gray-200 rounded-lg">
      <div className="flex justify-center">
        <Icon className="w-[146px] h-[144px] sm:w-[298px] sm:h-[296px]" />
      </div>
      <AccountMarkdown
        className="flex flex-col justify-center max-w-none lg:max-w-[500px]"
        content={content}
      />
    </div>
  )
}

export default TaxesFeesWaitingCard
