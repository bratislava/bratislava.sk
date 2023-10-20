export enum Tier {
  NEW = 'NEW',
  QUEUE_IDENTITY_CARD = 'QUEUE_IDENTITY_CARD',
  NOT_VERIFIED_IDENTITY_CARD = 'NOT_VERIFIED_IDENTITY_CARD',
  IDENTITY_CARD = 'IDENTITY_CARD',
  EID = 'EID',
}

export interface Address {
  formatted?: string
  street_address?: string
  locality?: string
  region?: string
  postal_code?: string
  country?: string
  phone_number?: string
}

export enum AccountType {
  FyzickaOsoba = 'fo',
  PravnickaOsoba = 'po',
  FyzickaOsobaPodnikatel = 'fo-p',
}

// as returned by Amplify.Auth.currentAuthenticatedUser().attributes
// sent from BE as server side props
export interface UserData {
  sub?: string
  email_verified?: string
  email?: string
  name?: string
  given_name?: string
  family_name?: string
  phone_number?: string
  phone_verified?: string
  address?: string
  'custom:ifo'?: string
  'custom:tier'?: Tier
  'custom:account_type'?: AccountType
  'custom:turnstile_token'?: string
}
