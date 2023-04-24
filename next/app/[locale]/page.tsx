import { homepageContextFetcher } from '@backend/fetchers/homepageContextFetcher'
import HomepageContent from '@components/pages/HomepageContent'
import { HomepageContextProvider } from '@utils/homepageContext'
import { useLocale } from 'next-intl'

export default async function Index() {
  const locale = useLocale()
  const homepageContext = await homepageContextFetcher(locale)

  return (
    <HomepageContextProvider homepageContext={homepageContext}>
      <HomepageContent />
    </HomepageContextProvider>
  )
}
