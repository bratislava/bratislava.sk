# Bratislava.sk

This readme should get you up & running. For more detailed documentation, check the /docs file in the root of the repo.

## First-time setup

You need `node` and `yarn` installed locally.

To install dependencies run:

```
yarn
```

For CMS setup see `strapi` directory. You can also run the project against production strapi - this is the default setup. If you want to run against local strapi, you need to set `NEXT_PUBLIC_STRAPI_URL` in `.env.development.local` file.

## Typescript Strict Mode

We're working on gradually enabling TS strict mode. To achieve this, we're using [typescript-strict-plugin](https://github.com/allegro/typescript-strict-plugin).

It allows for gradual adoption of strict mode. A file that has `// @ts-strict-ignore` at the top of the file, will not be checked with TS strict.

1. If you work on a file, remove `// @ts-strict-ignore` and fix the TS errors
2. If you create a new file, don't add `// @ts-strict-ignore`

### VSCode support

VSCode supports this plugin out of the box. However, sometimes it can use its own typescript version instead of the project one, resulting in not reading the local tsconfig. If you are using VSCode be sure to have `Use workspace version` option selected in `Typescript: Select Typescript Version...` command available in the [command pallete](https://code.visualstudio.com/docs/getstarted/userinterface#_command-palette).

<img width="729" alt="image" src="https://user-images.githubusercontent.com/35625949/153884371-e0f488d4-05b8-4b88-93d2-1caa7e6081f7.png">

## Run project locally

```
yarn dev
```

By default this connects you to the production Strapi instance - this is all you need for much of the FE development or bugfixes. If you need to edit anything on the side of Strapi, it's still recommended that you start from seeded data instead of an empty database - read more in the `../strapi/README.md` or the [relevant docs](https://bratislava.github.io/docs/recipes/load-strapi-db-in-local-dev).

## Meilisearch

We're using [Meilisearch](https://www.meilisearch.com/) as our search engine - for search to work, Next & Strapi needs to connect to a running meilisearch instance. You can develop most of the page without this, but if you need to work with search follow [the guide on our docs page](https://bratislava.github.io/docs/bratislava.sk/meilisearch-setup).

You can also setup local meilisearch instance using `docker compose` - see `docker-compose.yml` in the root of the repo and set your `.env.development.local` vars accordingly.

## Generate GraphQL

Strapi V4 does not export schema.graphql by default - instead, you'll need a running server to generate types from graphql endpoint. Otherwise the process is the same

```bash
# to update queries or mutations, modify *.graphql files in /graphql/queries directory
# have the strapi server running locally on port 1337 and run the following
yarn gen
```

## On-demand Strapi revalidation

To use on-demand revalidation, we need to add one key in .env file i.e.

```
STRAPI_REVALIDATE_SECRET_TOKEN = <value>
```

This token should be the same as we pass in webhook url as query param.
