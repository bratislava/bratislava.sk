# Bratislava.sk

This readme should get you up & running. For more detailed documentation, check the /docs file in the root of the repo.

## First-time setup

You need `node` and `yarn` installed locally.

To install dependencies run:

```
yarn
```

For CMS setup see `strapi` directory. You can also run the project against production strapi (useful when debugging) `` - provided that you're not working on Strapi model changes or tth

## Run project locally

```
yarn dev
```

## Meilisearch

We're using [Meilisearch](https://www.meilisearch.com/) as our search engine - for search to work, Next & Strapi needs to connect to a running meilisearch instance. You can develop most of the page without this, but if you need to work with search follow [the guide on our docs page](https://bratislava.github.io/docs/bratislava.sk/meilisearch-setup).

## Generate GraphQL

Strapi V4 does not export schema.graphql by default - instead, you'll need a running server to generate types from graphql endpoint. Otherwise the process is the same

```bash
# to update queries or mutations, modify *.graphql files in /graphql/queries directory
# have the strapi server running locally on port 1337 and run the following
yarn gen
```

## Typescript Strict Mode

**TODO this section is not valid _yet_, keeping it in as we'll want to do this ~in coming days~ soon™**

We're working on gradually enabling TS strict mode. To achieve this, we're using [typescript-strict-plugin](https://github.com/allegro/typescript-strict-plugin).

It allows for gradual adoption of strict mode. A file that has `// @ts-strict-ignore` at the top of the file, will not be checked with TS strict.

It is recommended to:

1. If you work on a file, remove `// @ts-strict-ignore` and fix the TS errors
2. If you create a new file, don't add `// @ts-strict-ignore`

### VSCode support

VSCode supports this plugin out of the box. However, sometimes it can use its own typescript version instead of the project one, resulting in not reading the local tsconfig. If you are using VSCode be sure to have `Use workspace version` option selected in `Typescript: Select Typescript Version...` command available in the [command pallete](https://code.visualstudio.com/docs/getstarted/userinterface#_command-palette).

<img width="729" alt="image" src="https://user-images.githubusercontent.com/35625949/153884371-e0f488d4-05b8-4b88-93d2-1caa7e6081f7.png">

To use on-demand revalidation, we need to add one key in .env file i.e.

```
STRAPI_REVALIDATE_SECRET_TOKEN = <value>
```

This token should be the same as we pass in webhook url as query param.

## Temp forms libraries

The following libraries have been added as part of forms experiments and should be reviewed & cleared up as needed before merging to master:

```
    "@cloudflare/json-schema-walker": "^0.1.1",
    "@emotion/react": "^11.10.4",
    "@emotion/styled": "^11.10.4",
    "@jsonforms/core": "^3.0.0-rc.1",
    "@jsonforms/material-renderers": "^3.0.0-rc.1",
    "@jsonforms/react": "^3.0.0-rc.1",
    "@jsonforms/vanilla-renderers": "^3.0.0-rc.1",
    "@mui/icons-material": "^5.10.3",
    "@mui/lab": "^5.0.0-alpha.97",
    "@mui/material": "^5.10.3",
    "@mui/styles": "^5.10.3",
    "@mui/x-date-pickers": "^5.0.0-beta.7",
    "ajv": "^8.11.0",
    "ajv-formats": "^2.1.1",
    "cheerio": "^1.0.0-rc.12",
    "json-schema": "^0.4.0",
    "libxmljs2": "^0.30.1",
    "typescript-json": "^3.2.1",
    "@types/json-schema": "^7.0.11",
    "json-schema-to-typescript": "^11.0.2",
```

Bootstrap styles are also added to `app.tsx` becasue of `@rjsf/core`

```html
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
```
