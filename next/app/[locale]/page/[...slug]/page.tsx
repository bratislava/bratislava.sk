import GeneralPageContent from '@components/pages/generalPageContent'
import { client } from '@utils/gql'
import { useLocale } from 'next-intl'

export default async function Index({ params }: { params: { slug: string[] } }) {
  const locale = useLocale()
  console.log(params, locale)
  const { pages } = await client.PageBySlug({
    slug: params.slug.join('/'),
    locale,
  })

  const page = pages?.data?.[0]
  if (!page) return { notFound: true }

  return <GeneralPageContent page={page} />
}
