import axios from 'axios'

import { serverEnvironment } from '@/src/environment.server'
import { ContactsSectionFragment } from '@/src/services/graphql'

const PAGE_SIZE = 100

/** A category of the city account Strapi. */
type MunicipalServiceCategory = {
  title: string
  slug: string
}

type MunicipalServiceCategoriesResponse = { data: MunicipalServiceCategory[] }

/**
 * The categories municipal services are filed under, listed whole - the ones on a service only say which of them it
 * uses. Errors are swallowed the same way the services themselves swallow theirs.
 */
export const getMunicipalServiceCategories = async (): Promise<MunicipalServiceCategory[]> => {
  try {
    const response = await axios.get<MunicipalServiceCategoriesResponse>(
      `${serverEnvironment.cityAccountStrapiUrl}/api/municipal-service-categories`,
      { params: { sort: 'title', 'pagination[pageSize]': PAGE_SIZE } },
    )

    return response.data.data
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Content inventory: failed to fetch municipal service categories.', error)

    return []
  }
}

/**
 * The city account's contacts section is the same Strapi component as this website's one, so it is typed by the
 * fragment generated for that one - minus the fields naming the graphql types, which the rest api does not use.
 */
export type MunicipalServiceContactsSection = {
  __component: 'sections.contacts'
} & Omit<ContactsSectionFragment, '__typename' | 'id' | 'titleLevelContactsSection'>

/** Only the fields the inventory reads - the rest of a service (its card, icon, other sections) is presentation. */
export type MunicipalServiceEntity = {
  documentId: string
  slug: string
  title: string
  description?: string | null
  publishedAt?: string | null
  updatedAt?: string | null
  categories?: MunicipalServiceCategory[] | null
  /** Only the contacts sections are asked for, so this is what the dynamic zone holds here. */
  sections?: (MunicipalServiceContactsSection | null)[] | null
}

type MunicipalServicesResponse = {
  data: MunicipalServiceEntity[]
  meta: { pagination: { page: number; pageCount: number } }
}

/**
 * Municipal services live in the city account Strapi (konto.bratislava.sk), which this app has no GraphQL client for -
 * its rest api is read directly instead, the same way konto reads this website's Strapi.
 *
 * Published services only, which is what the rest api returns by default. Errors are swallowed and cost the inventory
 * this content type instead of the whole snapshot, the same way the official board handles an unreachable GINIS.
 */
export const getMunicipalServices = async (): Promise<MunicipalServiceEntity[]> => {
  const services: MunicipalServiceEntity[] = []

  try {
    for (let page = 1; ; page += 1) {
      // Only what the inventory reads - `populate=*` would pull every section of every service along.
      // eslint-disable-next-line no-await-in-loop
      const response = await axios.get<MunicipalServicesResponse>(
        `${serverEnvironment.cityAccountStrapiUrl}/api/municipal-services`,
        {
          params: {
            // The object form throughout - Strapi answers with a 500 when the two notations are mixed.
            'populate[categories]': true,
            // Of the dynamic zone only the contacts sections, with their cards - the other sections are presentation.
            'populate[sections][on][sections.contacts][populate]': '*',
            'pagination[page]': page,
            'pagination[pageSize]': PAGE_SIZE,
          },
        },
      )

      services.push(...response.data.data)

      if (page >= response.data.meta.pagination.pageCount) {
        break
      }
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Content inventory: failed to fetch municipal services.', error)

    return []
  }

  return services
}
