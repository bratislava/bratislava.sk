import cx from 'classnames'
import { Panel } from '../Panel/Panel'

export interface VerticalCardProps extends React.HTMLAttributes<HTMLDivElement> {
  accessory?: React.ReactNode
  imageSrc?: string
}

export const VerticalCard = ({ accessory, className, children, imageSrc, ...rest }: VerticalCardProps) => (
  <div className={cx(className, 'relative flex flex-col')} {...rest}>
    <Panel className="flex-1 flex flex-col">
      {imageSrc && (
        <div
          className="bg-cover"
          style={{
            backgroundImage: `url(${imageSrc})`,
            paddingTop: '71.4%',
          }}
        />
      )}
      <div className="flex-1 px-6 py-8 lg:px-8 lg:pt-8 lg:pb-11">{children}</div>
    </Panel>
    {accessory && <div className={cx('absolute bottom-0 pl-8 transform translate-y-1/2')}>{accessory}</div>}
  </div>
)

export default VerticalCard
