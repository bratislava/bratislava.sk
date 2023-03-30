// @ts-strict-ignore
import { AuthenticationResult, ConfidentialClientApplication } from '@azure/msal-node'
import _ from 'lodash'

const config = {
  auth: {
    clientId: process.env.MSAL_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${process.env.MSAL_TENANT_ID}`,
    clientSecret: process.env.MSAL_CLIENT_SECRET,
  },
}

const cca = new ConfidentialClientApplication(config)

// caching of token should be taken care of by the msal library
export const getToken = async (): Promise<AuthenticationResult> => {
  return cca.acquireTokenByClientCredential({
    scopes: [process.env.MSAL_SCOPE],
  })
}

export interface UsersRequest {
  token: string
  department: string
}

export interface UserResponse {
  businessPhones: string[]
  displayName: string
  givenName?: string
  jobTitle?: string
  mail: string
  mobilePhone?: string
  officeLocation?: string
  preferredLanguage?: string
  surname?: string
  userPrincipalName: string
  id: string
}
export interface UsersResponse {
  '@odata.context'?: string
  '@odata.nextLink'?: string
  value: UserResponse[]
}

interface GetUserByEmailParams {
  token: string
  email: string
}

export type MSGraphGroupUser = {
  '@odata.type': '#microsoft.graph.user'
  id: string
  businessPhones: string[]
  displayName: string | null
  givenName: string | null
  jobTitle: string | null
  mail: string | null
  mobilePhone: string | null
  officeLocation: string | null
  preferredLanguage: string | null
  surname: string | null
  userPrincipalName: string | null
  otherMails: string[]
}

export type MSGraphGroup = {
  '@odata.type': '#microsoft.graph.group'
  id: string
  deletedDateTime: string | null
  classification: string | null
  createdDateTime: string | null
  creationOptions: any[]
  description: string | null
  displayName: string | null
  expirationDateTime: string | null
  groupTypes: any[]
  isAssignableToRole: string | null
  mail: string | null
  mailEnabled: false
  mailNickname: string | null
  membershipRule: string | null
  membershipRuleProcessingState: string | null
  onPremisesDomainName: string | null
  onPremisesLastSyncDateTime: string | null
  onPremisesNetBiosName: string | null
  onPremisesSamAccountName: string | null
  onPremisesSecurityIdentifier: string | null
  onPremisesSyncEnabled: true
  preferredDataLocation: string | null
  preferredLanguage: string | null
  proxyAddresses: any[]
  renewedDateTime: string | null
  resourceBehaviorOptions: any[]
  resourceProvisioningOptions: any[]
  securityEnabled: true
  securityIdentifier: string | null
  theme: string | null
  visibility: string | null
  onPremisesProvisioningErrors: any[]
}

// we display only selected properties on frontend - don't leak anything unwanted
export type MSGraphFilteredGroup = Pick<MSGraphGroup, '@odata.type' | 'id' | 'displayName'>
export type MSGraphFilteredGroupUser = Pick<
  MSGraphGroupUser,
  '@odata.type' | 'id' | 'displayName' | 'mail' | 'businessPhones' | 'jobTitle' | 'otherMails'
>
export type MSGraphGroupResponse = Array<MSGraphFilteredGroupUser | MSGraphFilteredGroup>

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

// for ordering people from most important within their department - the higher score the better
const roleOrderingScore = (role: string | null | undefined) => {
  let score = 0
  if (!role) return score
  // puts leadership in front, their secretaries as second
  // counting on 'Veduci/Veduca' and 'Riaditel/Riaditelka' to be the Role names in AD
  // deals with '1. ...' or 'Prvý ...' as super-special role (i.e. '1. námestníčka primátora')
  if (role.startsWith('1.') || role.startsWith('Prv')) {
    score = 3
  } else if (role.startsWith('Vedúc') || role.startsWith('Riadit')) {
    score = 2
  } else if (role.includes('Vedúc') || role.includes('Riadit')) {
    score = 1
  }
  return score
  // TODO deal with other roles
}

export const getGroupMembersRecursive = async (
  accessToken: string,
  groupId: string,
  groupDisplayName: string | null,
) => {
  const { value } = await getGroupMembersByGroupId({ token: accessToken, id: groupId })
  const groupedResult = _.groupBy(value, '@odata.type')
  return {
    id: groupId,
    displayName: groupDisplayName,
    users: (
      groupedResult['#microsoft.graph.user']?.map(
        (user) =>
          _.pick(user, [
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

// TODO consider rewriting these to fetch their own tokens instead of them being provided
export const getUserByEmail = async ({ token, email }: GetUserByEmailParams) => {
  const url = `https://graph.microsoft.com/v1.0/users/${email}`
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.json()
}

export const getUsersByDepartment = async ({ token, department }: UsersRequest): Promise<any> => {
  const result = await fetch(
    `https://graph.microsoft.com/v1.0/users?$filter=Department eq '${department}'`,
    {
      method: 'get',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  const resultData = await result.json()

  if (resultData.error) {
    const error = new Error(resultData.error.message)
    console.error(error)

    return {
      value: [],
    }
  }

  return resultData
}

interface GetUsersByDisplayNameParams {
  token: string
  query: string
}

export const getUsersByDisplayName = async ({
  token,
  query,
}: GetUsersByDisplayNameParams): Promise<MSGraphFilteredGroupUser[]> => {
  // https://learn.microsoft.com/en-us/graph/api/resources/user?view=graph-rest-1.0
  const url = `https://graph.microsoft.com/v1.0/users?$select=id,displayName,mail,businessPhones,jobTitle,otherMails&$search="displayName:${query}"`
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      ConsistencyLevel: 'eventual',
    },
  })

  const resultData = await response.json()

  if (resultData.error) {
    const error = new Error(resultData.error.message)
    console.error(error)

    return []
  }

  return (
    resultData?.value?.map((user) =>
      _.pick(user, [
        '@odata.type',
        'id',
        'displayName',
        'mail',
        'businessPhones',
        'jobTitle',
        'otherMails',
      ]),
    ) || []
  )
}
