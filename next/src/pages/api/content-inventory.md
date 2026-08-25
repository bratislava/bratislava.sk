# Content inventory changelog

Versions of the `/api/content-inventory` response, as returned in its `version` field.

## 2

- Add `files` to every entry, as `{ id, url, title }`
- Add links between entries as `{ id, title, url }`, where `id` is the `id` of the linked entry
- Add `page.assets` and `page.regulations` with the content the page links from its sections
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
