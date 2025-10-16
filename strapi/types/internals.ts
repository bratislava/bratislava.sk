import { Model } from '@strapi/database'
import { UID } from '@strapi/strapi'

// Based on Notum Strapi template: https://github.com/notum-cz/strapi-next-monorepo-starter/blob/3fc5b292641ae3c82be7a50b923aa0041a8df372/apps/strapi/types/internals.ts

export type StrapiPreviewConfig = {
  enabled: boolean
  previewSecret?: string
  clientUrl?: string
  enabledContentTypeUids: Array<UID.CollectionType>
}

export type LifecycleEventType<T extends keyof Model["lifecycles"]> =
  Parameters<Model["lifecycles"][T]>[0]
