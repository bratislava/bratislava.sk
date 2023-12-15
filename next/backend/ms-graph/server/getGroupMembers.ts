import { MSGraphFilteredGroupUser, MSGraphGroupResponse } from '@backend/ms-graph/types'
import groupBy from 'lodash/groupBy'
import pick from 'lodash/pick'

// TODO revisit the whole file

type GetGroupMembersByGroupIdParams = {
  token: string
  id: string
}

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

export const getGroupMembersByGroupId = async ({
  token,
  id,
}: GetGroupMembersByGroupIdParams): Promise<{ value: MSGraphGroupResponse }> => {
  const response = await fetch(
    // sry no link for documentation, this is as close as documentation gets https://learn.microsoft.com/en-us/graph/api/group-list-members?view=graph-rest-1.0&tabs=http
    `https://graph.microsoft.com/v1.0/groups/${id}/members?$select=id,businessPhones,displayName,givenName,jobTitle,mail,mobilePhone,officeLocation,preferredLanguage,surname,userPrincipalName,otherMails`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
  return response.json()
}

export type GetGroupMembersRecursiveResult = {
  id: string
  displayName?: string
  users: MSGraphFilteredGroupUser[]
  groups: GetGroupMembersRecursiveResult[]
}

export const getGroupMembersRecursive = async (
  accessToken: string,
  groupId: string,
  groupDisplayName: string | null,
): Promise<any> => {
  const { value } = await getGroupMembersByGroupId({ token: accessToken, id: groupId })
  const groupedResult = groupBy(value, '@odata.type')

  return {
    id: groupId,
    displayName: groupDisplayName,
    users: (
      groupedResult['#microsoft.graph.user']?.map(
        (user) =>
          pick(user, [
            '@odata.type',
            'id',
            'displayName',
            'mail',
            'businessPhones',
            'jobTitle',
            'otherMails',
          ]) as MSGraphFilteredGroupUser,
      ) || []
    )
      .filter((user) => user.displayName)
      .sort((a, b) => {
        const aScore = roleOrderingScore(a.jobTitle)
        const bScore = roleOrderingScore(b.jobTitle)
        const difference = bScore - aScore
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion,@typescript-eslint/no-non-null-assertion
        return difference === 0 ? a.displayName!.localeCompare(b.displayName!) : difference
      }),
    groups: groupedResult['#microsoft.graph.group']
      ? (
          await Promise.all(
            groupedResult['#microsoft.graph.group'].map((group) =>
              getGroupMembersRecursive(accessToken, group.id, group.displayName),
            ),
          )
        )
          // eslint-disable-next-line unicorn/no-await-expression-member
          .sort((a, b) => a.displayName.localeCompare(b.displayName))
      : [],
  }
}
