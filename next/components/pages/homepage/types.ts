import { HomepageQuery } from '@bratislava/strapi-sdk-homepage'

export interface BlogPost {
  imageSrc?: string | null
  title?: string | null
  url?: string | null
}

export type Header = HomepageQuery['homepage']['data']['attributes']['header']
export type Homepage = HomepageQuery['homepage']
