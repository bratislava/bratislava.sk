import groupBy from 'lodash/groupBy'

import { PARAMS_FROM_MS_GRAPH_API } from '@/services/ms-graph/server/constants'
import {
  GetGroupMembersRecursiveResult,
  MSGraphFilteredGroup,
  MSGraphFilteredGroupUser,
  MSGraphGroupResponse,
} from '@/services/ms-graph/types'

/**
 * Returns an ordering score for a role, higher score means higher priority
 *
 * @param role
 */
export const roleOrderingScore = (role: string | null | undefined) => {
  let score = 0
  if (!role) return score
  // puts leadership in front, their secretaries as second
  // counting on 'Veduci/Veduca' and 'Riaditel/Riaditelka' to be the Role names in AD
  // deals with '1. ...' or 'Prvý ...' as super-special role (i.e. '1. námestníčka primátora')
  if (role.startsWith('1.') || role.startsWith('Prv')) {
    score = 6
  } else if (role.startsWith('Vedúc') || role.startsWith('Riadit') || role.startsWith('Poveren')) {
    score = 5
  } else if (role.includes('vedúc') || role.includes('riadit') || role.includes('poveren')) {
    score = 4
  } else if (
    role.startsWith('Hlavná architektka') ||
    role.startsWith('Hlavný architekt') ||
    role.startsWith('Mestská kontrolórka') ||
    role.startsWith('Mestský kontrolór') ||
    role.startsWith('Hlavná ekonómka') ||
    role.startsWith('Hlavný ekonóm')
  ) {
    score = 3
  } else if (role.startsWith('Zástup')) {
    score = 2
  } else if (role.startsWith('Hovor')) {
    score = 1
  }
  return score
}

/**
 * Returns direct members (users and groups) of a group.
 *
 * Docs: https://learn.microsoft.com/en-us/graph/api/group-list-members?view=graph-rest-1.0&tabs=http
 *
 * @param groupId
 * @param accessToken
 */
export const getGroupMembersByGroupId = async (groupId: string, accessToken: string) => {
  const response = await fetch(
    `https://graph.microsoft.com/v1.0/groups/${groupId}/members?$select=${PARAMS_FROM_MS_GRAPH_API.join(
      ',',
    )}`,
    { headers: { Authorization: `Bearer ${accessToken}` } },
  )

  return response.json() as Promise<{ value: MSGraphGroupResponse }>
}

/**
 * Get all group's members and recursively visit each nested group.
 * Return whole structure as a tree, where users are sorted by role and alphabetically.
 *
 * @param accessToken
 * @param groupId
 * @param groupDisplayName
 */
export const getGroupMembersRecursive = async (
  accessToken: string,
  groupId: string,
  groupDisplayName: string | null,
): Promise<GetGroupMembersRecursiveResult> => {
  const responseData = await getGroupMembersByGroupId(groupId, accessToken)

  const groupedResult = groupBy(responseData.value, '@odata.type')

  const groupUsers =
    // There can be no users in a group so the "?? []" is needed even though typescript doesn't complain
    (groupedResult['#microsoft.graph.user'] ?? [])
      // Filter out users without displayName, then safely cast to MSGraphFilteredGroupUser
      .filter((user) => user.displayName)
      .map((user) => user as MSGraphFilteredGroupUser)
      // Show leading roles first, clerks second, both sorted alphabetically
      .sort((a, b) => a.displayName.localeCompare(b.displayName))
      .sort((a, b) => roleOrderingScore(b.jobTitle) - roleOrderingScore(a.jobTitle))

  const nestedGroupsPromises =
    // There can be no nested groups in a group so the "?? []" is needed even though typescript doesn't complain
    (groupedResult['#microsoft.graph.group'] ?? [])
      // Filter out groups without displayName, then safely cast to MSGraphFilteredGroup
      .filter((nestedGroup) => nestedGroup.displayName)
      .map((nestedGroup) => nestedGroup as MSGraphFilteredGroup)
      .sort((a, b) => a.displayName.localeCompare(b.displayName))
      .map((nestedGroup) =>
        getGroupMembersRecursive(accessToken, nestedGroup.id, nestedGroup.displayName),
      )
  const nestedGroups = await Promise.all(nestedGroupsPromises)

  return {
    id: groupId,
    displayName: groupDisplayName,
    users: groupUsers,
    groups: nestedGroups,
  }
}
