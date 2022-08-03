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
  '@odata.type' | 'id' | 'displayName' | 'mail' | 'businessPhones' | 'jobTitle'
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
  const response = await fetch(`https://graph.microsoft.com/v1.0/groups/${id}/members`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.json()
}

export type GetGroupMembersRecursiveResult = {
  id: string
  displayName?: string
  users: MSGraphFilteredGroupUser[]
  groups: GetGroupMembersRecursiveResult[]
}

export const getGroupMembersRecursive = async (accessToken: string, groupId: string, groupDisplayName: string) => {
  const { value } = await getGroupMembersByGroupId({ token: accessToken, id: groupId })
  const groupedResult = _.groupBy(value, '@odata.type')
  return {
    id: groupId,
    displayName: groupDisplayName,
    users:
      groupedResult['#microsoft.graph.user']?.map((user) =>
        _.pick(user, ['@odata.type', 'id', 'displayName', 'mail', 'businessPhones', 'jobTitle'])
      ) || [],
    groups: groupedResult['#microsoft.graph.group']
      ? await Promise.all(
          groupedResult['#microsoft.graph.group'].map((group) =>
            getGroupMembersRecursive(accessToken, group.id, group.displayName)
          )
        )
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
  const result = await fetch(`https://graph.microsoft.com/v1.0/users?$filter=Department eq '${department}'`, {
    method: 'get',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

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
