/**
 * pages-by-component router
 */

const customRoutes = {
  routes: [
    {
      method: 'GET',
      path: '/pages-by-component/components',
      handler: 'pages-by-component.getComponents',
      config: {
        middlewares: ['api::pages-by-component.admin-auth'],
        auth: false, // Admin authentication handled by middleware
      },
    },
    {
      method: 'GET',
      path: '/pages-by-component/pages',
      handler: 'pages-by-component.getPagesByComponent',
      config: {
        middlewares: ['api::pages-by-component.admin-auth'],
        auth: false, // Admin authentication handled by middleware
      },
    },
  ],
}

export default customRoutes
