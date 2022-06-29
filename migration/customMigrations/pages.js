const { migrate } = require('../migrate/helpers/migrate')

// Tables that should not be proccessed later
const processedTables = [
  // 'pages'
]

// Custom migration function, handles DB reads and writes
async function migrateTables() {
  // await migrate('pages', 'pages'
  // , (role) => ({
  //   id:role.id,
  //   slug:role.slug,
  //   page_color:role.pageColor,
  //   page_category:role.pageCategory,
  //   parent_page:role.parentPage,
  //   title:role.title,
  //   locale:role.locale,
  //   published_at:role.published_at,
  //   updated_by_id:role.created_by,
  //   created_by_id:role.updated_by,
  //   created_at: role.created_at,
  //   updated_at:role.updated_at,
  //   meta_discription:role.metaDiscription
  // })
  // )
}

module.exports = {
  processedTables,
  migrateTables,
}
