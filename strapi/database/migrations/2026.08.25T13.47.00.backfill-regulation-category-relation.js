'use strict'

/**
 * Mirrors the `regulation.category` enumeration into the `regulationCategory` relation, so both can coexist until the
 * FE stops reading the enum.
 *
 * The link table is written directly instead of going through the Document Service, because `regulation` uses draft &
 * publish - every document has a draft row and a published row in `regulations`, each with its own id, and each needs
 * its own link row. The Document Service would only update the draft and would require publishing to propagate,
 * which would also publish unrelated draft changes.
 *
 * The enum value and `regulationCategory.pictogram` are intentionally identical, so the two tables join on it.
 *
 * `regulation_ord` is the position of a regulation within its category (the inverse `regulations` collection), so it
 * continues from the highest existing value in that category.
 *
 * Regulations that already have a link are skipped, regulations without a category are left alone.
 *
 * This bypasses lifecycles - no webhook fires, so the FE is not revalidated and Meilisearch is not reindexed. Trigger
 * a reindex from the Meilisearch plugin in the admin panel afterwards.
 */

async function up(knex) {
  const tablesExist =
    (await knex.schema.hasTable('regulations')) &&
    (await knex.schema.hasTable('regulation_categories')) &&
    (await knex.schema.hasTable('regulations_regulation_category_lnk'))

  if (!tablesExist) {
    strapi.log.warn('backfill-regulation-category-relation: tables missing, skipping.')

    return
  }

  const inserted = await knex.raw(`
    insert into regulations_regulation_category_lnk (regulation_id, regulation_category_id, regulation_ord)
    select
      unlinked.id,
      unlinked.regulation_category_id,
      coalesce(existing.max_ord, 0) + row_number() over (
        partition by unlinked.regulation_category_id order by unlinked.id
      )
    from (
      select regulation.id, category.id as regulation_category_id
      from regulations as regulation
      inner join regulation_categories as category on category.pictogram = regulation.category
      left join regulations_regulation_category_lnk as link on link.regulation_id = regulation.id
      where regulation.category is not null and link.id is null
    ) as unlinked
    left join (
      select regulation_category_id, max(regulation_ord) as max_ord
      from regulations_regulation_category_lnk
      group by regulation_category_id
    ) as existing on existing.regulation_category_id = unlinked.regulation_category_id
  `)

  const [{ count: remaining }] = await knex('regulations as regulation')
    .leftJoin(
      'regulations_regulation_category_lnk as link',
      'link.regulation_id',
      'regulation.id',
    )
    .whereNull('link.id')
    .whereNotNull('regulation.category')
    .count('regulation.id as count')

  strapi.log.info(
    `backfill-regulation-category-relation: linked ${inserted.rowCount} regulation rows, ${remaining} left without a category relation.`,
  )

  if (Number(remaining) > 0) {
    strapi.log.warn(
      'backfill-regulation-category-relation: some regulations have an enum value with no matching regulation category, check that all 8 categories were seeded.',
    )
  }
}

module.exports = { up }
