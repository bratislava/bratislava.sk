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

// We display only selected properties on frontend
// !! Don't leak anything unwanted
// Keep in sync with PARAMS_FROM_MS_GRAPH_API
// Keep '@odata.type' for grouping
export type MSGraphFilteredGroup = {
  displayName: string
} & Pick<MSGraphGroup, '@odata.type' | 'id'>

export type MSGraphFilteredGroupUser = {
  displayName: string
} & Pick<
  MSGraphGroupUser,
  '@odata.type' | 'id' | 'mail' | 'businessPhones' | 'jobTitle' | 'otherMails'
>

export type MSGraphGroupResponse = Array<MSGraphFilteredGroupUser | MSGraphFilteredGroup>

export type GetGroupMembersRecursiveResult = {
  id: string
  displayName: string | null
  users: MSGraphFilteredGroupUser[]
  groups: GetGroupMembersRecursiveResult[]
}
