import cx from 'classnames'
import { ReactNode } from 'react'

type WrapperProps = {
  title?: string
  children: ReactNode
  direction?: 'column' | 'row'
}

export const Wrapper = ({ title, children, direction = 'row' }: WrapperProps) => {
  const classNameStyles = cx(
    'flex',
    {
      'flex-col space-y-2': direction === 'column',
      'space-x-2': direction === 'row',
    }
  )

  return (
    <div className="border-t-1 mb-10 flex flex-col border border-x-0 border-b-0 border-solid border-gray-800 pt-10">
      {title && <h2 className="text-h2 pb-2">{title}</h2>}
      <div className={classNameStyles}>
        {children}
      </div>
    </div>
)
}
