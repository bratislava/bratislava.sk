import cx from 'classnames'
import { Panel } from '../Panel/Panel'

export interface HorizontalCardProps extends React.HTMLAttributes<HTMLDivElement> {
  accessory?: React.ReactNode
  imageSrc?: string
}

export const HorizontalCard = ({ accessory, className, children, imageSrc, ...rest }: HorizontalCardProps) => (
  <div className={cx(className, 'relative')} {...rest}>
    <Panel className="flex flex-col xl:flex-row h-full w-full" hoverable>
      {imageSrc && (
        <>
          <div
            className="bg-cover xl:hidden"
            style={{
              backgroundImage: `url(${imageSrc})`,
              paddingTop: '71.4%',
              clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0% 100%)',
            }}
          />
          <div
            className="bg-cover hidden xl:block flex-0 w-56 max-w"
            style={{
              backgroundImage: `url(${imageSrc})`,
              clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0% 100%)',
            }}
          />
        </>
      )}
      <div className="p-6 lg:px-12 lg:pt-8 lg:pb-11 text-sm lg:text-default text-center xl:text-left xl:self-center xl:pb-8 flex-1">
        {children}
      </div>
    </Panel>
    {accessory && (
      <div className={cx('absolute bottom-0 left-1/2 transform translate-y-1/2 -translate-x-1/2')}>{accessory}</div>
    )}
  </div>
)

export default HorizontalCard
