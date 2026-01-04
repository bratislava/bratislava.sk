/**
 * pages-by-component service
 */

export default {
  getComponents: async (strapi: any) => {
    const pageContentType = strapi.contentTypes?.['api::page.page']
    if (!pageContentType) {
      throw new Error('Page content type not found')
    }

    const sectionsAttribute = pageContentType.attributes?.sections
    if (sectionsAttribute?.type !== 'dynamiczone') {
      throw new Error('Sections field is not a dynamiczone')
    }

    const componentNames = sectionsAttribute.components || []
    if (!strapi.components) {
      return { components: [] }
    }

    const components = componentNames
      .filter((name: any): name is string => typeof name === 'string' && name.includes('.'))
      .map((componentName: string) => {
        const [category, name] = componentName.split('.')
        const schema = strapi.components[componentName]
        return schema
          ? {
              category,
              name,
              displayName: schema.info?.displayName || name,
            }
          : null
      })
      .filter((c): c is { category: string; name: string; displayName: string } => c !== null)
      .sort((a, b) => a.displayName.localeCompare(b.displayName))

    return { components }
  },
}
