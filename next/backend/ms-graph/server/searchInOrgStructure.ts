import { MS_GRAPH_GROUP_ID, PARAMS_FROM_MS_GRAPH_API } from '@backend/ms-graph/server/constants'
import { MSGraphFilteredGroupUser } from '@backend/ms-graph/types'
import axios from 'axios'

/**
 * Return search results from Active Directory (MS Graph API) based on search query.
 * Search in displayName, jobTitle and mail (based on docs, mail compares only startsWith).
 *
 * @param query
 * @param accessToken
 */
export const searchInOrgStructure = async (query: string, accessToken: string) => {
  const url = `https://graph.microsoft.com/v1.0/groups/${MS_GRAPH_GROUP_ID}/transitiveMembers?${[
    `$select=${PARAMS_FROM_MS_GRAPH_API.join(',')}`,
    `$search="displayName:${query}" OR "jobTitle:${query}" OR "mail:${query}"`,
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
