import { useLocale } from 'next-intl'
import { PropsWithChildren, useMemo } from 'react'
import { I18nProvider } from 'react-aria'

// Copied from: https://github.com/bratislava/marianum/blob/762d10222bd33352b77a44d902620181b07107c1/next/components/atoms/MI18nProvider.tsx

// eslint-disable-next-line @typescript-eslint/ban-types
const BAI18nProvider = ({ children }: PropsWithChildren<{}>) => {
  const locale = useLocale()

  const reactAriaLocale = useMemo(() => {
    if (locale === 'en') {
      /* https://unix.stackexchange.com/a/62317
       * https://github.com/date-fns/date-fns/issues/1996#issuecomment-984811417 */
      return 'en-IE'
    }
    return 'sk-SK'
  }, [locale])

  return <I18nProvider locale={reactAriaLocale}>{children}</I18nProvider>
}

export default BAI18nProvider
