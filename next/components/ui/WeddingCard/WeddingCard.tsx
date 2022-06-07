import cx from 'classnames'
import { Card } from '../Card/Card'
export interface WeddingCardProps {
  className?: string
  imageSrc?: string
  title?: string
  content?: string
  buttonContent?: string
}

export const WeddingCard = ({ className, imageSrc, title, content, buttonContent }: WeddingCardProps) => (
  <div className={cx(className, 'justify-center py-20 xl:flex')}>
    <div className="max-w-screen md:px-41 md:mx-auto">
      <Card className="w-10/12 mx-24 hidden xl:block" buttonPosition="right-36" buttonContent={buttonContent}>
        <div className="flex">
          {imageSrc && <img src={imageSrc} alt="Svadba" width="455" height="225" />}
          <div className="mr-24 ml-28 mt-12 mb-16 w-64 ">
            <h1 className="text-md font-semibold ">{title}</h1>
            <span className="text-sm">{content}</span>
          </div>
        </div>
      </Card>
    </div>
  </div>
)

export default WeddingCard
