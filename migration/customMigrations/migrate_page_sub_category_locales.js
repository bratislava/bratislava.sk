const { migrate } = require('../migrate/helpers/migrate')

// Tables that should not be proccessed later
const processedTables = ['page_subcategories__localizations']

// Custom migration function, handles DB reads and writes
async function migrateTables() {
  await migrate('page_subcategories__localizations', 'page_subcategories_localizations_links', (role) => {
    return (
      {
        page_subcategory_id: role.page_subcategory_id,
        inv_page_subcategory_id: role['page-subcategory_id'],
      }
    )
  }
  )
}

module.exports = {
  processedTables,
  migrateTables,
}
