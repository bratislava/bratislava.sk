/* eslint-disable no-console */
import fs from 'node:fs'
import path from 'node:path'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const strapiMeiliConfig = require('../../strapi/config/plugins.meilisearch.config.ts')?.default
  ?? require('../../strapi/config/plugins.meilisearch.config.ts')

const entityKeys = [
  'page',
  'article',
  'asset',
  'document',
  'inba-release',
  'regulation',
  'faq',
] as const

type EntityKey = (typeof entityKeys)[number]

const outputPath = path.join(__dirname, '..', '..', 'strapi', 'config', 'meiliPopulatePaths.generated.ts')

const asStringArray = (value: unknown): string[] =>
  Array.isArray(value) ? (value.filter((x): x is string => typeof x === 'string') as string[]) : []

const mapping: Record<EntityKey, string[]> = entityKeys.reduce((acc, key) => {
  const populate = strapiMeiliConfig?.[key]?.entriesQuery?.populate
  acc[key] = asStringArray(populate)
  return acc
}, {} as Record<EntityKey, string[]>)

const stringify = (values: string[]) => values.map((v) => JSON.stringify(v)).join(',\n    ')

const lines: string[] = []
lines.push('/* eslint-disable */')
lines.push('// Shared populate paths for Strapi Meilisearch `entriesQuery.populate` and Next `*Meili` types.')
lines.push('//')
lines.push('// AUTO-GENERATED FROM `strapi/config/plugins.meilisearch.config.ts` (resolved `entriesQuery.populate`).')
lines.push('// To refresh, run from `next/`:')
lines.push('//   npm run gen:meili:populate')
lines.push('')
lines.push('export const meiliPopulatePaths = {')

for (const key of entityKeys) {
  const needsQuotes = key.includes('-')
  const propKey = needsQuotes ? `'${key}'` : key

  const values = mapping[key]
  const valuesBlock =
    values.length === 0
      ? '[] as const'
      : `[\n    ${stringify(values)}\n  ] as const`

  lines.push(`  ${propKey}: ${valuesBlock},`)
}

lines.push('} as const')
lines.push('')

fs.writeFileSync(outputPath, lines.join('\n'), 'utf8')
console.log(`Wrote: ${outputPath}`)

