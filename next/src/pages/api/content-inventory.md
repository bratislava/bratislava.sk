# Content inventory changelog

Versions of the `/api/content-inventory` response, as returned in its `version` field.

## 3

- Add `taxonomies` next to `items`, with `articleCategories`, `tags`, `assetCategories`, `regulationCategories`, `urbanStudyCategories`, `urbanStudyStates`, `officialBoardCategories` and `municipalServiceCategories`, each value as `{ title, slug, locale }`, the slug missing for the official board's categories, which GINIS only names - listed whole, unaffected by the filters and the pagination, and referenced from the entries by slug
- Reduce the taxonomies an entry is filed under to their slug alone - `article.category`, `article.tags`, `asset.category`, `regulation.category`, `urban-study.category`, `urban-study.state` and `municipal-service.categories` are now strings, their titles read from `taxonomies` by slug - `official-board.category` is the exception and keeps naming its category by title, the only thing GINIS returns for a posted document
- Omit `files` from the entries that have none, instead of returning an empty list
- Flatten `page.contacts` and `municipal-service.contacts` into a plain list of contact cards, drop section titles and subtexts
- Drop `locale` and `isLocalized` from the entries and the `locale` query parameter - only the Slovak content is listed, so the entry ids lost their locale too and are now `${type}:${documentId}`
- Add the `municipal-service` type, listing the services of the city account (konto.bratislava.sk), with `municipal-service.categories` and `municipal-service.contacts`, the latter shaped the same way `page.contacts` is - their `url` points to the city account, not to this website
- Add the `official-board` type, listing the documents currently posted on the official board, with `official-board.category`, `official-board.numberOfFiles` and `official-board.publishedUntil` - the board's list carries no files, so `files` is never set for this type, and a document is keyed and addressed by its base64 encoded GINIS id

## 2

- Add `files` to every entry, as `{ id, url, title }`
- Add links between entries as `{ id, title, url }`, where `id` is the `id` of the linked entry
- Add `owner` as `{ title, slug }` to the entries whose content belongs to an admin group - pages, articles and assets
- Add `page.assets` and `page.regulations` with the content the page links from its sections
- Add `page.contacts` with the page's contacts sections, each as `{ title, subtext, contactItems }`, in the order they are rendered
- Each contact is discriminated by `type` - `address`, `openingHours`, `email`, `phone`, `web`, `postalAddress`, `billingInfo` and `bankConnection` carry `value` and a `customLabel` where the editor overrode the default one, `person` carries `name`, `email`, `phone` and `subtext`, `directions` carries `address`, `parkingInfo`, `publicTransportInfo`, `barrierFreeInfo` and `mapUrl`
- Add `urban-study.regulations`
- Add `inba-release.articles` and `article.inbaRelease`
- Add `regulation.regRelations` with `amendments`, `amending`, `cancelledBy` and `cancelling`
- Remove `regulation.validity.cancelledBy` in favour of `regulation.regRelations.cancelledBy`
- Resolve `regulation.regRelations.cancelledBy` from a cancelled amendee too, not only from a direct cancellation

## 1

- Add the endpoint, listing every page, article, asset, regulation, inba release and urban study that has its own url
- Add the shared fields of an entry - `id`, `type`, `url`, `locale`, `isLocalized`, `title`, `summary`, `addedAt` and `modifiedAt`
- Add the type specific data under the key named after the type - `page`, `article`, `asset`, `regulation` and `urban-study`
- Add the `modifiedSince`, `type`, `locale`, `fields`, `page` and `pageSize` query parameters
