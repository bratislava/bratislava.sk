const { migrate } = require('../migrate/helpers/migrate')

// Tables that should not be proccessed later
const processedTables = ['page_categories__localizations']

// Custom migration function, handles DB reads and writes
async function migrateTables() {
   await migrate('page_categories__localizations', 'page_categories_localizations_links', (role) => {
    return (
      {
        page_category_id: role.page_category_id,
        inv_page_category_id: role['page-category_id'],
      }
    )
  }
  )
}

module.exports = {
  processedTables,
  migrateTables,
}
