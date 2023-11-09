// more as a reference than something you should rely upon
// used only with Partial, unless we'll write FE validation
export interface CityAccountUser {
  Enabled: boolean
  UserCreateDate: string
  UserLastModifiedDate: string
  UserStatus: string
  address: string
  'custom:sing_in_at': string
  'custom:tier': string
  email: string
  email_verified: string
  family_name: string
  given_name: string
  idUser: string
  phone_number: string
  phone_number_verified: string
  sub: string
}

// mirrors the definitions in konto.bratislava.sk:

export enum PostMessageTypes {
  ACCESS_TOKEN = 'ACCESS_TOKEN',
  UNAUTHORIZED = 'UNAUTHORIZED',
}

export interface CityAccountPostMessage {
  type: PostMessageTypes
  payload?: Record<string, string>
}

export const validCityAccountPostMessageTypes = Object.values(PostMessageTypes)
