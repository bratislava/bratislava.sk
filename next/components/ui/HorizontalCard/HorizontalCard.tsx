import cx from 'classnames'
import Image from 'next/image'

import { Panel } from '../Panel/Panel'

export interface HorizontalCardProps extends React.HTMLAttributes<HTMLDivElement> {
  accessory?: React.ReactNode
  imageSrc?: string
  imageSizes?: string
}

export const HorizontalCard = ({
  accessory,
  className,
  children,
  imageSrc,
  imageSizes,
  ...rest
}: HorizontalCardProps) => (
  <div className={cx(className, 'relative')} {...rest}>
    <Panel className="flex h-full w-full flex-col lg:flex-row" hoverable>
      {imageSrc && (
        <>
          <div
            className="relative overflow-hidden lg:hidden"
            style={{
              paddingTop: '71.4%',
            }}
          >
            <Image
              src={imageSrc}
              alt=""
              fill
              className="h-full w-full object-cover"
              sizes={imageSizes}
            />
          </div>
          <div className="flex-0 max-w relative hidden w-56 bg-cover lg:block">
            <Image src={imageSrc} alt="" fill className="object-cover" sizes={imageSizes} />
          </div>
        </>
      )}
      <div className="text-p1 flex-1 p-6 text-center lg:self-center lg:px-12 lg:py-8 lg:text-left">
        {children}
      </div>
    </Panel>
    {accessory && (
      <div className={cx('absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 transform')}>
        {accessory}
      </div>
    )}
  </div>
)

export default HorizontalCard
