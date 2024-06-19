import cx from 'classnames'

type StackProps = {
  bg?: 'white' | 'dark'
  width?: 'desktop' | 'mobile' | 'full' | null
  direction?: 'column' | 'row'
  children: React.ReactNode
}

const Stack = ({ direction = 'row', children }: StackProps) => {
  const classNameStyles = cx(
    'flex flex-wrap gap-2 rounded-lg border border-dashed border-grey-800 p-4',
    {
      'flex-col items-center': direction === 'column',
      'items-end': direction === 'row',
    },
  )

  return <div className={classNameStyles}>{children}</div>
}

export default Stack
