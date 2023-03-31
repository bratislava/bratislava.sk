import { Strapi } from '@strapi/strapi'

export default ({ strapi }: { strapi: Strapi }) => {
  strapi.customFields.register({
    name: 'icon-field',
    plugin: 'ba-icon-field',
    type: 'string',
  })
}
