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
 *  - Upload the file with the `k8minio` helper (`minio.sh` in the `k8-helpers` repo). It reads the MinIO credentials
 *    from the cluster, gives the key a slugified name with a random suffix, refuses to overwrite an existing key, and
 *    prints exactly the fields below. Keep the helper's default `--prefix upload/`, the `upload/<hash><ext>` layout is
 *    what the provider recomposes on delete.
 *  - Paste the printed `name`, `hash`, `ext`, `mime`, `size` and `url` into a new `filesToRegister` entry and add
 *    `provider: 'aws-s3'`, it is the same for the whole bucket.
 *    - Check that the object is really served as the reported `mime` (`curl -sI <url>`) - the helper reads it with
 *      `file --mime-type`, while `mc` sets the stored Content-Type from the extension, and the two can disagree for
 *      less common formats.
 *    - Without the helper, upload the file by hand, compose the url (see `config/env/production/plugins.ts`), take
 *      the size from `curl -sI <url>` (`Content-Length`) and convert it to kilobytes as explained above.
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
