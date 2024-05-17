import slugify from '@sindresorhus/slugify'
import axios from 'axios'

import { MS_GRAPH_GROUP_ID, PARAMS_FROM_MS_GRAPH_API } from '@/backend/ms-graph/server/constants'
import { MSGraphFilteredGroupUser } from '@/backend/ms-graph/types'

/**
 * Return search results from Active Directory (MS Graph API) based on search query.
 * Search in displayName, jobTitle and mail (based on docs, mail compares only startsWith).
 *
 * Docs:
 * https://learn.microsoft.com/en-us/graph/api/group-list-transitivemembers?view=graph-rest-1.0&tabs=http
 * https://learn.microsoft.com/en-us/graph/api/resources/user?view=graph-rest-1.0
 * https://learn.microsoft.com/en-us/graph/search-query-parameter?tabs=http#using-search-on-directory-object-collections
 * https://learn.microsoft.com/en-us/graph/best-practices-concept
 *
 * @param query
 * @param accessToken
 */
export const searchInOrgStructure = async (query: string, accessToken: string) => {
  /* Letters with diacritics causes request to fail (it needs investigation why, but slugify helps) */
  const sanitizedQuery = slugify(query, { separator: ' ', customReplacements: [['ä', 'a']] }).trim()

  const url = `https://graph.microsoft.com/v1.0/groups/${MS_GRAPH_GROUP_ID}/transitiveMembers?${[
    `$select=${PARAMS_FROM_MS_GRAPH_API.join(',')}`,
    `$search="displayName:${sanitizedQuery}" OR "jobTitle:${sanitizedQuery}" OR "mail:${sanitizedQuery}"`,
    // TODO add support for searching in businessPhones and mobilePhone
    // `$filter=businessPhones/any(p:startsWith(p, '+421-'))`,
  ].join('&')}`

  const response = await axios.get<{ value: MSGraphFilteredGroupUser[] }>(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      ConsistencyLevel: 'eventual',
    },
  })

  // Filter out users without displayName, use "?" and "?? []" to return safe value
  return response.data?.value?.filter((user) => user.displayName) ?? []
}
