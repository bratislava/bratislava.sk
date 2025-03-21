const configSyncConfig = {
  // Docs: https://github.com/pluginpal/strapi-plugin-config-sync?tab=readme-ov-file#-settings
  excludedConfig: [
    // Defaults
    'core-store.plugin_users-permissions_grant',
    'core-store.plugin_upload_metrics',
    'core-store.strapi_content_types_schema',
    'core-store.ee_information',
    // Api key is private and MUST be excluded
    'core-store.plugin_meilisearch_meilisearch_api_key',
    // Host is set differently on localhost and deployed environments so we don't want to sync it
    'core-store.plugin_meilisearch_meilisearch_host',
    // This both files are changed by every click in meilisearch strapi admin panel, so it's impossible to sync them
    'core-store.plugin_meilisearch_meilisearch_indexed_content_types',
    'core-store.plugin_meilisearch_meilisearch_listened_content_types',
  ],
}

export default configSyncConfig
