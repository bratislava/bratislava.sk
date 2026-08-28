import type { NextApiRequest, NextApiResponse } from 'next'
import {
  createLoader,
  parseAsArrayOf,
  parseAsInteger,
  parseAsIsoDateTime,
  parseAsStringLiteral,
} from 'nuqs/server'

import { environment } from '@/src/environment'
import { getInventorySnapshot } from '@/src/services/content-inventory/snapshotCache'
import {
  InventoryEntry,
  InventoryResponse,
  inventoryTypes,
} from '@/src/services/content-inventory/types'

/** Bump when the shape of an entry changes in a way that can break consumers. */
const INVENTORY_VERSION = 3

/** Used when a page is requested without a page size. Without any pagination parameter everything is returned. */
const DEFAULT_PAGE_SIZE = 100

const searchParams = {
  modifiedSince: parseAsIsoDateTime,
  type: parseAsArrayOf(parseAsStringLiteral(inventoryTypes), ','),
  fields: parseAsStringLiteral(['url'] as const),
  page: parseAsInteger,
  pageSize: parseAsInteger,
}

const loadSearchParams = createLoader(searchParams)

/**
 * The nuqs parsers fall back to null instead of failing, and the array parser silently drops values it cannot parse -
 * which would turn a mistyped `modifiedSince` into a full re-ingest or a mistyped `type` into a partial one. Anything
 * that was sent but not fully parsed is an error instead.
 */
const getInvalidParams = (request: NextApiRequest, parsed: Record<string, unknown>) => {
  return Object.keys(searchParams).filter((key) => {
    const rawValue = request.query[key]

    if (!rawValue || typeof rawValue !== 'string') {
      return false
    }

    const parsedValue = parsed[key]

    // A comma separated list is invalid as soon as one of its values could not be parsed.
    if (Array.isArray(parsedValue)) {
      return parsedValue.length !== rawValue.split(',').length
    }

    return parsedValue === null
  })
}

const toUrlEntry = (entry: InventoryEntry) => ({
  id: entry.id,
  url: entry.url,
  modifiedAt: entry.modifiedAt,
})

const handler = async (
  request: NextApiRequest,
  response: NextApiResponse<InventoryResponse | { error: string }>,
) => {
  // Off where the flag is not set, the same way the rss feed is - the endpoint is not public on production yet.
  if (environment.featureFlagContentInventory !== 'true') {
    response.status(404).json({ error: 'Not found' })

    return
  }

  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET')
    response.status(405).json({ error: 'Method not allowed' })

    return
  }

  const parsedParams = loadSearchParams(request.query)
  const invalidParams = getInvalidParams(request, parsedParams)

  if (invalidParams.length > 0) {
    response.status(400).json({
      error: `Invalid query parameters: ${invalidParams.join(', ')}. Allowed types are ${inventoryTypes.join(', ')}, fields url, modifiedSince is an ISO date.`,
    })

    return
  }

  let snapshot

  try {
    snapshot = await getInventorySnapshot()
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Content inventory: failed to build the snapshot.', error)
    response.status(502).json({ error: 'Content backend is not reachable' })

    return
  }

  const { modifiedSince, type, fields, page, pageSize } = parsedParams

  const generatedAt = new Date(snapshot.builtAt).toISOString()

  const filtered = snapshot.entries.filter((entry) => {
    // An empty `type=` is treated as no filter at all, not as "nothing matches".
    if (type?.length && !type.includes(entry.type)) {
      return false
    }

    if (modifiedSince && !(entry.modifiedAt && new Date(entry.modifiedAt) > modifiedSince)) {
      return false
    }

    return true
  })

  // Without any pagination parameter everything is returned as a single page.
  const isPaginated = Boolean(page ?? pageSize)
  const currentPage = page ?? 1
  const currentPageSize = isPaginated ? (pageSize ?? DEFAULT_PAGE_SIZE) : filtered.length
  const paginated = isPaginated
    ? filtered.slice((currentPage - 1) * currentPageSize, currentPage * currentPageSize)
    : filtered

  response.status(200).json({
    version: INVENTORY_VERSION,
    generatedAt,
    totalItems: filtered.length,
    page: currentPage,
    pageSize: currentPageSize,
    pageCount: currentPageSize > 0 ? Math.ceil(filtered.length / currentPageSize) : 1,
    items: fields === 'url' ? paginated.map(toUrlEntry) : paginated,
    // The whole taxonomies, whatever the filters are - they are small, and a consumer needs them to make sense of the
    // categories and tags the entries carry.
    taxonomies: snapshot.taxonomies,
  })
}

export const config = {
  api: {
    // The full inventory is a few megabytes.
    responseLimit: false,
  },
}

export default handler
