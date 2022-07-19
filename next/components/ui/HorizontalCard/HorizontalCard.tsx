import cx from 'classnames'

import { Panel } from '../Panel/Panel'

export interface HorizontalCardProps extends React.HTMLAttributes<HTMLDivElement> {
  accessory?: React.ReactNode
  imageSrc?: string
}

export const HorizontalCard = ({ accessory, className, children, imageSrc, ...rest }: HorizontalCardProps) => (
  <div className={cx(className, 'relative')} {...rest}>
    <Panel className="flex h-full w-full flex-col xl:flex-row" hoverable>
      {imageSrc && (
        <>
          <div
            className="bg-cover xl:hidden"
            style={{
              backgroundImage: `url(${imageSrc})`,
              paddingTop: '71.4%',
              clipPath: 'polygon(0 0, 100% 0, 100% 90%, 0% 100%)',
            }}
          />
          <div
            className="flex-0 max-w hidden w-56 bg-cover xl:block"
            style={{
              backgroundImage: `url(${imageSrc})`,
            }}
          />
        </>
      )}
      <div className="flex-1 p-6 text-center text-sm lg:px-12 lg:pt-8 lg:pb-11 lg:text-default xl:self-center xl:pb-8 xl:text-left">
        {children}
      </div>
    </Panel>
    {accessory && (
      <div className={cx('absolute bottom-0 left-1/2 transform translate-y-1/2 -translate-x-1/2')}>{accessory}</div>
    )}
  </div>
)

export default HorizontalCard
