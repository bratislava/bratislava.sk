'use strict';

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 *
 * See more details here: https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/configurations.html#bootstrap
 */

// Changes microsoft tenant
module.exports = async () => {
  const pluginStore = strapi.store({
    environment: '',
    type: 'plugin',
    name: 'users-permissions',
    key: 'grant',
  });

  // Get actual grant config
  const prevGrantConfig = (await pluginStore.get({ key: 'grant' })) || {};

  // Setup Microsoft grant config
  const endpoint = process.env.MICROSOFT_AUTH_TENANT_ID || 'common';
  const microsoftGrantConfig = {
    authorize_url: `https://login.microsoftonline.com/${endpoint}/oauth2/v2.0/authorize`,
    access_url: `https://login.microsoftonline.com/${endpoint}/oauth2/v2.0/token`,
  };

  // Merge previous config and overwrite with our custom Microsoft grant config
  const newGrantConfig = {
    ...prevGrantConfig,
    microsoft: {
      ...prevGrantConfig.microsoft,
      ...microsoftGrantConfig,
    },
  };

  // Overwrite grant Config
  await pluginStore.set({ key: 'grant', value: newGrantConfig });
};
