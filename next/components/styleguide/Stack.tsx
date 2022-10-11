import cx from 'classnames'

type StackProps = {
  bg?: 'white' | 'dark'
  width?: 'desktop' | 'mobile' | 'full' | null
  direction?: 'column' | 'row'
  children: React.ReactNode
}

export const Stack = ({ direction = 'row', children }: StackProps) => {
  const classNameStyles = cx(
    'flex flex-wrap gap-1 p-3 border border-dashed border-gray-800 rounded-lg',
    {
      'flex-col space-y-2 items-center': direction === 'column',
      'space-x-2 items-end': direction === 'row',
    }
  )

  return (
    <div className={classNameStyles}>
      {children}
    </div>
  )
}
