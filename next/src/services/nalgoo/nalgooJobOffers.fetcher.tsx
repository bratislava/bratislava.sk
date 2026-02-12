export type NalgooJobOffersResponse = {
  id: number
  title: string
  language: string
  featured: boolean
  publishedOn: string
  updatedOn: string
  location: string | null
  salary: string | null
  salaryInfo: string
  url: string | null
  employmentForms: {
    id: number
    name: string
  }[]
  fields: any[]
}

export const getNalgooJobOffersQueryKey = () => ['NalgooJobOffers']

/**
 * Documentation: https://doc.echoapi.com/docs/detail/3e0967471402000?target_id=2085ccd97d4002
 */

export const fetchNalgooJobOffers = async () => {
  const result = await fetch('/api/nalgoo/nalgooJobOffers')

  return result.json() as Promise<NalgooJobOffersResponse[]>
}
