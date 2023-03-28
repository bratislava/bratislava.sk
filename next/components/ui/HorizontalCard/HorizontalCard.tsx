import cx from 'classnames'

import { Panel } from '../Panel/Panel'

export interface HorizontalCardProps extends React.HTMLAttributes<HTMLDivElement> {
  accessory?: React.ReactNode
  imageSrc?: string
}

export const HorizontalCard = ({
  accessory,
  className,
  children,
  imageSrc,
  ...rest
}: HorizontalCardProps) => (
  <div className={cx(className, 'relative')} {...rest}>
    <Panel className="flex h-full w-full flex-col lg:flex-row" hoverable>
      {imageSrc && (
        <>
          <div
            className="bg-cover lg:hidden"
            style={{
              backgroundImage: `url(${imageSrc})`,
              paddingTop: '71.4%',
            }}
          />
          <div
            className="flex-0 max-w hidden w-56 bg-cover lg:block"
            style={{
              backgroundImage: `url(${imageSrc})`,
            }}
          />
        </>
      )}
      <div className="text-p1 flex-1 p-6 text-center lg:self-center lg:px-12 lg:py-8 lg:text-left">
        {children}
      </div>
    </Panel>
    {accessory && (
      <div className={cx('absolute bottom-0 left-1/2 translate-y-1/2 -translate-x-1/2 transform')}>
        {accessory}
      </div>
    )}
  </div>
)

export default HorizontalCard
