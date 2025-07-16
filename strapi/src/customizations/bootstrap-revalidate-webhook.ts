import { Core } from '@strapi/strapi'

const REVALIDATE_WEBHOOK_NAME = 'Bootstrapped Revalidate'

export const bootstrapRevalidateWebhook = async ({ strapi }: { strapi: Core.Strapi }) => {
  // Create Revalidate webhook according to this suggestion https://github.com/strapi/strapi/pull/20487#issuecomment-2419729414
  const webhook = await strapi.db.query('strapi::webhook').findOne({
    where: {
      name: REVALIDATE_WEBHOOK_NAME,
    },
  })

  if (!webhook) {
    strapi.get('webhookStore').createWebhook({
      id: REVALIDATE_WEBHOOK_NAME,
      name: REVALIDATE_WEBHOOK_NAME,
      url: `${process.env.REVALIDATE_NEXT_URL}/api/revalidate?secret=${process.env.REVALIDATE_SECRET_TOKEN}`,
      events: ['entry.create', 'entry.update', 'entry.publish'],
      headers: {},
      enabled: true,
    })
    console.log('Revalidate webhook created')
  } else {
    console.log('Revalidate webhook already exists')
  }
}
