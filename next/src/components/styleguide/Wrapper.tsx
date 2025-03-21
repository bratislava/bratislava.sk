import { ReactNode } from 'react'

import cn from '@/src/utils/cn'

type WrapperProps = {
  title?: string
  children: ReactNode
  direction?: 'column' | 'row'
  noBorder?: boolean
}

const Wrapper = ({ title, children, direction = 'row', noBorder }: WrapperProps) => {
  const wrapperClassNames = cn(
    'border-t-1 mb-10 flex flex-col border border-b-0 border-l-0 border-r-0 border-solid border-grey-800 pt-10',
    {
      'border-t-0': noBorder,
    },
  )

  const childrenClassNames = cn('flex', {
    'flex-col space-y-2': direction === 'column',
    'space-x-2 justify-between': direction === 'row',
  })

  return (
    <div className={wrapperClassNames}>
      {/* FIXME Typography. Convert to use Typography. Issue: Probably safe to convert but cant find page where is this used for testing */}
      {title && <h2 className="text-h2 pb-2">{title}</h2>}
      <div className={childrenClassNames}>{children}</div>
    </div>
  )
}

export default Wrapper
