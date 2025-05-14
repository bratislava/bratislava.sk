import Stack from '@/src/components/styleguide/Stack'
import Wrapper from '@/src/components/styleguide/Wrapper'
import cn from '@/src/utils/cn'

const TOKEN_CLASSNAMES = [
  'border-border-error',
  'border-border-success',
  'border-border-warning',
  'border-border-passive-primary',
  'border-border-passive-secondary',
  'border-border-active-default',
  'border-border-active-hover',
  'border-border-active-disabled',
  'border-border-active-focused',
  'border-border-active-inverted-default',
  'border-border-active-inverted-hover',
  'border-border-active-primary-default',
  'border-border-active-primary-hover',
  'border-border-active-primary-pressed',
  'border-border-active-primary-inverted-default',
  'border-border-active-primary-inverted-hover',
  'border-border-active-primary-inverted-pressed',
  'border-border-active-secondary-default',
  'border-border-active-secondary-hover',
  'border-border-active-secondary-pressed',
  'border-border-active-secondary-inverted-default',
  'border-border-active-secondary-inverted-hover',
  'border-border-active-secondary-inverted-pressed',
  'border-border-active-tertiary-default',
  'border-border-active-tertiary-hover',
  'border-border-active-tertiary-pressed',
  'border-border-active-tertiary-inverted-default',
  'border-border-active-tertiary-inverted-hover',
  'border-border-active-tertiary-inverted-pressed',
  'bg-background-error-default',
  'bg-background-error-hover',
  'bg-background-error-pressed',
  'bg-background-error-soft-default',
  'bg-background-error-soft-hover',
  'bg-background-error-soft-pressed',
  'bg-background-warning-default',
  'bg-background-warning-soft-default',
  'bg-background-success-default',
  'bg-background-success-soft-default',
  'bg-background-passive-base',
  'bg-background-passive-primary',
  'bg-background-passive-secondary',
  'bg-background-passive-tertiary',
  'bg-background-passive-inverted-base',
  'bg-background-active-primary-default',
  'bg-background-active-primary-hover',
  'bg-background-active-primary-pressed',
  'bg-background-active-primary-inverted-default',
  'bg-background-active-primary-inverted-hover',
  'bg-background-active-primary-inverted-pressed',
  'bg-background-active-primary-soft-default',
  'bg-background-active-primary-soft-hover',
  'bg-background-active-primary-soft-pressed',
  'bg-background-active-primary-soft-inverted-default',
  'bg-background-active-primary-soft-inverted-hover',
  'bg-background-active-primary-soft-inverted-pressed',
  // background-active secondary and tertiary variants are part of DS but probably not used currently
  'text-content-error-default',
  'text-content-error-hover',
  'text-content-error-pressed',
  'text-content-warning-default',
  'text-content-success-default',
  'text-content-passive-primary',
  'text-content-passive-secondary',
  'text-content-passive-tertiary',
  'text-content-passive-inverted-primary',
  'text-content-passive-inverted-secondary',
  'text-content-passive-inverted-tertiary',
  'text-content-active-primary-default',
  'text-content-active-primary-hover',
  'text-content-active-primary-pressed',
  'text-content-active-primary-disabled',
  'text-content-active-primary-inverted-default',
  'text-content-active-primary-inverted-hover',
  'text-content-active-primary-inverted-pressed',
  'text-content-active-primary-inverted-disabled',
  // content-active secondary and tertiary variants are part of DS but probably not used currently
]

const TokensShowcase = () => {
  return (
    <Wrapper direction="column" title="Tokens">
      <Stack className="flex flex-col items-start">
        {TOKEN_CLASSNAMES.map((tokenClassName) => {
          return (
            <div key={tokenClassName} className={cn('flex items-center gap-4')}>
              <div
                className={cn(
                  'flex h-6 w-6 items-center justify-center rounded-full font-bold',
                  { 'border-3': tokenClassName.startsWith('border') },
                  tokenClassName,
                )}
              >
                {tokenClassName.startsWith('text') ? 'A' : null}
              </div>
              <div>{tokenClassName}</div>
            </div>
          )
        })}
      </Stack>
    </Wrapper>
  )
}

export default TokensShowcase
