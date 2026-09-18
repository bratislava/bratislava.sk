'use strict'

/**
 * This migration script is usually used for large files that were uploaded to the MinIO bucket manually.
 * It registers these files into the media library, so they can be picked in the admin panel.
 *
 * Nothing is uploaded here - the objects must already exist in the bucket under the `upload` root path (see
 * `config/env/production/plugins.ts`). The migration only creates the matching `files` rows in db.
 *
 * `hash` and `ext` must together match the object key (`upload/<hash><ext>`) - the provider builds the key from them,
 * never from `url`, so a mismatch means that removing the file from the media library deletes the wrong object or
 * nothing at all.
 * Strapi stores `size` in kilobytes (`bytesToKbytes`: bytes / 1000, rounded to two decimals).
 * Files are placed at the media library root (`folderPath` `/`, no folder relation).
 * `width`, `height` and `formats` stay empty, so images registered this way have no thumbnails - the admin panel falls
 * back to the original file. Registering images or videos with this script was not tested. It's mainly for documents.
 *
 * This file is plain JS on purpose - the migration runner only globs `*.{js,sql}` and reads a named `up` export.
 *
 * How to add a new file:
 *  - Upload the file to minio bucket using minio cli (or minio web ui).
 *    - Make sure it uses proper MIME type.
 *    - Preferably, use random alphanumeric string in file name to mimic Strapi behaviour: file-name_r4nD0m5tr1nG.ext
 *  - Get file data:
 *    - Compose the file's url (see `config/env/production/plugins.ts`)
 *    - Get file size - use HEAD request (`curl -sI <url>`) instead of guessing. Compute size in kilobytes.
 *  - Copy this file to a new one with a current timestamp in its name, and keep only the new entries in
 *    `filesToRegister` there. Migrations run once per file name, so editing this one has no effect on environments
 *    that already ran it.
 *  - Entries whose `url` is already in the db table are skipped, so re-running against a partially seeded database is
 *    safe.
 *  - Commit and deploy. The file should be added to db on Strapi startup.
 *
 * Urls are hardcoded - dev, staging and prod share one bucket (`MINIO_BUCKET` and `MINIO_PUBLIC_ENDPOINT` live in
 * `kubernetes/base/.env`, only the credentials differ per environment), so the same url is valid everywhere.
 */

const filesToRegister = [
  {
    name: 'test.pdf',
    hash: 'test',
    ext: '.pdf',
    mime: 'application/pdf',
    // 583 B
    size: 0.58,
    url: 'https://bratislavask.s3.bratislava.sk/upload/test.pdf',
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
