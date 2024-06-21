import cn from 'utils/cn'

type SpinnerBase = {
  size?: 'lg' | 'md' | 'sm'
  className?: string
}

/*
 * Figma: https://www.figma.com/file/17wbd0MDQcMW9NbXl6UPs8/DS-ESBS%2BBK%3A-Component-library?type=design&node-id=10-218&mode=design&t=1cbJf1GcvzdMNzSh-0
 *
 * Note: Figma is not followed exactly, because this implementation was much easier. Sizes should be implemented as in Figma.
 */

const Spinner = ({ size = 'md', className }: SpinnerBase) => {
  const style = cn('animate-spin rounded-[50%] border-solid border-grey-700 border-t-grey-300', {
    'w-5 h-5 border-2 border-t-2': size === 'sm',
    'w-8 h-8 border-3 border-t-3': size === 'md',
    'w-12 h-12 border-4 border-t-4': size === 'lg',
  })
  return (
    <div
      className={cn(
        {
          'h-6 w-6 p-0.5': size === 'sm',
          'h-10 w-10 p-1': size === 'md',
          'h-16 w-16 p-2': size === 'lg',
        },
        className,
      )}
    >
      <div className={style} />
    </div>
  )
}

export default Spinner
