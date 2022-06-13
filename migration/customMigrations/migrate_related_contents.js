const { migrate } = require('../migrate/helpers/migrate')

// Tables that should not be proccessed later
const processedTables = []

// Custom migration function, handles DB reads and writes
async function migrateTables() {
  await migrate('pages__related_contents', 'pages_related_contents_links', (role) => ({
    page_id: role.page_id,
    tag_id: role.tag_id,
  }))
}

module.exports = {
  processedTables,
  migrateTables,
}
