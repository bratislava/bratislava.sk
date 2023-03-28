import cx from 'classnames'
import Image from 'next/image'

import { Panel } from '../Panel/Panel'

export interface VerticalCardProps extends React.HTMLAttributes<HTMLDivElement> {
  accessory?: React.ReactNode
  imageSrc?: string
}

export const VerticalCard = ({
  accessory,
  className,
  children,
  imageSrc,
  ...rest
}: VerticalCardProps) => (
  <div className={cx(className, 'relative flex flex-col')} {...rest}>
    <Panel className="flex flex-1 flex-col">
      {imageSrc && (
        <div
          className="relative"
          style={{
            paddingTop: '71.4%',
          }}
        >
          <Image src={imageSrc} alt="" fill className="object-cover" />
        </div>
      )}
      <div className="flex-1 px-6 py-8 lg:px-8 lg:pt-8 lg:pb-11">{children}</div>
    </Panel>
    {accessory && (
      <div className={cx('absolute bottom-0 translate-y-1/2 transform pl-8')}>{accessory}</div>
    )}
  </div>
)

export default VerticalCard
