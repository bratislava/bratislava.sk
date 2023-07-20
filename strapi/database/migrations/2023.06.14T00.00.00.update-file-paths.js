'use strict'

// Official migration for issue with null path in media library
// https://github.com/strapi/strapi/issues/17228
// https://documentation-git-migration-media-library-folder-path-strapijs.vercel.app/dev-docs/migration/v4/migration-guide-4.7.0-to-4.11.4#installing-database-migration-script-optional

const FILE_TABLE = 'files'

async function up(trx) {
  // Updates file
  await trx.from(FILE_TABLE).whereNull('folder_path').update({ folder_path: '/' })
}

async function down() {}

module.exports = { up, down }
