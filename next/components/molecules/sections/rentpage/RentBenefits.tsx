import { HorizontalScrollWrapper, Rent, RentProps } from '@bratislava/ui-bratislava'

export interface IProps {
  title?: string
  rents?: Array<RentProps>
}

const RentBenefits = ({ rents, title }: IProps) => (
  <div className="mt-20 md:flex md:flex-col md:items-center">
    <h1 className="ml-14 text-2xl font-semibold md:ml-0 md:text-5xl"> {title} </h1>
    <HorizontalScrollWrapper className="my-14 md:grid-cols-3 md:gap-x-28 lg:gap-x-28 xl:gap-x-44">
      {rents.map((rent, index) => (
        <Rent key={index} {...rent} />
      ))}
    </HorizontalScrollWrapper>
  </div>
)

export default RentBenefits
