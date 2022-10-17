import { HomepageQuery } from '@bratislava/strapi-sdk-homepage'

export interface BlogPost {
  imageSrc?: string | null
  title?: string | null
  url?: string | null
}

export type Homepage = HomepageQuery['homepage']
// @ts-ignore
export type Header = Homepage['data']['attributes']['header'] | null | undefined
