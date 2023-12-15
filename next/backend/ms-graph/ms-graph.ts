// @ts-strict-ignore
import { MSGraphFilteredGroupUser, MSGraphGroupResponse } from '@backend/ms-graph/types'
import { roleOrderingScore } from '@backend/ms-graph/utils'
import groupBy from 'lodash/groupBy'
import pick from 'lodash/pick'

// TODO revisit the whole file

type GetGroupMembersByGroupIdParams = {
  token: string
  id: string
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
) => {
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
    ).sort((a, b) => {
      const aScore = roleOrderingScore(a.jobTitle)
      const bScore = roleOrderingScore(b.jobTitle)
      const difference = bScore - aScore
      return difference === 0 ? a.displayName.localeCompare(b.displayName) : difference
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
