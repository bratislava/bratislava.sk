'use strict'

/**
 * Seeds the `regulation-category` entries that replace the hardcoded `regulation.category` enumeration.
 *
 * Entries are created sequentially, in the same order as the enum values, because the relation has no explicit
 * ordering - the admin panel and the API list them by id, i.e. by creation order.
 *
 * Titles are the Slovak labels previously held in the FE translations (`Regulation.category.*`), `pictogram` matches
 * the enum value so it keeps pointing to the existing pictograms (`ICON_URL_MAP`, key `regulation_<pictogram>`).
 *
 * Migrations run before the schema sync, therefore this one is deployed only after the content type itself, so that
 * its table already exists. The `hasTable` check below is a safety net for environments booting both changes at once.
 *
 * This file is plain JS on purpose - the migration runner only globs `*.{js,sql}` and reads a named `up` export.
 */

const UID = 'api::regulation-category.regulation-category'

const regulationCategories = [
  { title: 'Dane a poplatky', slug: 'dane-a-poplatky', pictogram: 'daneAPoplatky' },
  { title: 'Pomenovanie ulíc', slug: 'pomenovanie-ulic', pictogram: 'pomenovanieUlic' },
  { title: 'Hospodárenie', slug: 'hospodarenie', pictogram: 'hospodarenie' },
  { title: 'Územné plánovanie', slug: 'uzemne-planovanie', pictogram: 'uzemnePlanovanie' },
  { title: 'Poriadok a čistota', slug: 'poriadok-a-cistota', pictogram: 'poriadokACistota' },
  {
    title: 'Sociálna pomoc a školstvo',
    slug: 'socialna-pomoc-a-skolstvo',
    pictogram: 'socialnaPomocASkolstvo',
  },
  { title: 'Ostatné', slug: 'ostatne', pictogram: 'ostatne' },
  { title: 'Archív', slug: 'archiv', pictogram: 'archiv' },
]

async function up(knex) {
  const tableExists = await knex.schema.hasTable('regulation_categories')
  if (!tableExists) {
    strapi.log.warn(
      'seed-regulation-categories: table `regulation_categories` does not exist yet, skipping.',
    )

    return
  }

  await strapi.db.transaction(async () => {
    for (const regulationCategory of regulationCategories) {
      const existing = await strapi.documents(UID).findMany({
        filters: { slug: { $eq: regulationCategory.slug } },
        limit: 1,
      })

      if (existing.length > 0) {
        continue
      }

      await strapi.documents(UID).create({ data: regulationCategory })
    }
  })
}

module.exports = { up }
