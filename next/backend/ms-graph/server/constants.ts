/**
 * 'Struktura pre web' group id
 */
export const MS_GRAPH_GROUP_ID = 'e2a318ff-fadb-4950-8ff0-a69660788e9d'

/**
 * Selected params to pick from MS Graph API endpoint.
 * Keep in sync with ts types.
 *
 * legacy params, keeping for reference: id,businessPhones,displayName,givenName,jobTitle,mail,mobilePhone,officeLocation,preferredLanguage,surname,userPrincipalName,otherMails
 */
export const PARAMS_FROM_MS_GRAPH_API = [
  'id',
  'displayName',
  'mail',
  'businessPhones',
  'jobTitle',
  'otherMails',
]
