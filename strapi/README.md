# Strapi - homepage

## Development

To start strapi-hompage application use:

```
nx serve strapi-homepage
```

For development purposes strapi is using sqlite in a docker volume. It has total of 4 docker volumes, one for node_modules, one for build, one for cache and for db.

To start with a fresh admin build (deletes build and cache volume) run

```
nx serve strapi-homepage --clean
```

To delete the database and start with fresh strapi, you have to remove the _strapi-homepage_db_ volume.

If you want to keep the database file outside of docker (warning: will cause performance issues and is really not necessary, if you want to explore using some client, just use a dockerized version and mount the volume to it), you can specify custom sqlite file location in _.env.local_ in variable **DATABASE_FILENAME**.

## Component mapping

Find details on how Strapi components map into React components on this docs file [mapping.md](../../../docs/apps/homepage/mapping.md).
