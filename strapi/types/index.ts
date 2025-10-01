// Based on Notum Strapi template: https://github.com/notum-cz/strapi-next-monorepo-starter/blob/f4561c7759c17e84f647d2c7e11abd752c9ab1aa/apps/strapi/types/index.ts

export type {
  ID,
  Result,
  PaginatedResult,
} from "@strapi/types/dist/modules/documents"

export type {
  FindMany,
  FindOne,
  FindFirst,
  Create,
  Delete,
  Update,
  Count,
  Publish,
  Unpublish,
  DiscardDraft,
} from "@strapi/types/dist/modules/documents/params/document-engine"

export type { Utils, UID, Data } from "@strapi/strapi"

export * from "./generated/components"
export * from "./generated/contentTypes"
