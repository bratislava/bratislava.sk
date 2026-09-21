'use strict'

/**
 * DO NOT DELETE THIS FILE
 *
 * This migration script takes manually uploaded files to MinIO and registers them into the Strapi media library.
 * Usually used fot large files that cannot be uploaded via Strapi admin.
 *
 * Notes:
 *  - Strapi stores `size` in kilobytes (`bytesToKbytes`: bytes / 1000, rounded to two decimals).
 *  - Files are placed at the media library root (`folderPath` `/`, no folder relation).
 *  - Registering images or videos with this script is not supported (`width`, `height` and `formats` stay empty).
 *  - Entries whose `url` is already in the db table are skipped, so re-running against a partially seeded database is
 *    safe.
 *  - All environments (dev, staging and prod) share one bucket.
 *
 * How to add a new file:
 *  - Upload the file using `mc` (MinIO Client) library https://github.com/minio/mc. You can use a prompt like this to get
 *    proper commands, or try to use previously AI generated script /strapi/scripts/dev/upload-to-minio.sh.
 *    > Using https://github.com/minio/mc, upload the file ./file.pdf to https://s3.bratislava.sk/bratislavask/upload/.
 *    > Slugify and generate unique suffix for it and check that there is no conflicting files in target location before uploading.
 *    > Do this using minio credentials you'll get by kubectl from staging cluster bratislava-strapi in standalone namespace.
 *  - Get the size, compute it in kilobytes, and get the mime type (`curl -sI <url>`)
 *  - Add a new entry to `filesToRegister` array with `name`, `hash`, `ext`, `mime`, `size`, `url` and `provider: 'aws-s3'`
 *  - Rename this migration file to use current timestamp, and keep only the new entries in `filesToRegister`.
 *    Migrations run once per file name per environment.
 *  - Commit and deploy. The file should be added to db on Strapi startup.
 */

const filesToRegister = [
  {
    name: 'test-1gb.pdf',
    hash: 'test-1gb_070f8aaaf4',
    ext: '.pdf',
    mime: 'application/pdf',
    size: 999999.89,
    url: 'https://bratislavask.s3.bratislava.sk/upload/test-1gb_070f8aaaf4.pdf',
    provider: 'aws-s3',
  },
]

async function up(knex) {
  const tableExists = await knex.schema.hasTable('files')
  if (!tableExists) {
    strapi.log.warn('register-manually-uploaded-files: table `files` does not exist yet, skipping.')

    return
  }

  for (const file of filesToRegister) {
    const [existing] = await knex('files').where('url', file.url).limit(1)

    if (existing) {
      strapi.log.info(
        `register-manually-uploaded-files: ${file.url} is already in the media library (id ${existing.id}), skipping.`
      )

      continue
    }

    const created = await strapi.db.query('plugin::upload.file').create({
      data: {
        ...file,
        alternativeText: null,
        caption: null,
        width: null,
        height: null,
        formats: null,
        previewUrl: null,
        provider_metadata: null,
        folder: null,
        folderPath: '/',
      },
    })

    strapi.log.info(
      `register-manually-uploaded-files: registered ${file.url} as file id ${created.id}.`
    )
  }
}

module.exports = { up }
