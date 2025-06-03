import cn from '@/src/utils/cn'

type StackProps = {
  direction?: 'column' | 'row'
  children: React.ReactNode
  className?: string
}

const Stack = ({ direction = 'row', children, className }: StackProps) => {
  const classNameStyles = cn(
    'flex flex-wrap gap-2 rounded-lg border border-dashed border-grey-800 p-4',
    {
      'flex-col items-center': direction === 'column',
      'items-end': direction === 'row',
    },
    className,
  )

  return <div className={classNameStyles}>{children}</div>
}

export default Stack
