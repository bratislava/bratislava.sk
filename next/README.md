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

## FOP

Apache™ FOP (Formatting Objects Processor) is a print formatter driven by XSL formatting objects (XSL-FO) and an output independent formatter. It is a Java application that reads a formatting object (FO) tree and renders the resulting pages to a specified output.

We are using [FOP](https://xmlgraphics.apache.org/fop/) to transform eForms to pdf. If you'd like to use this feature, Java 1.7 or later RE must be installed on your system. See [FOP Quick start guide](https://xmlgraphics.apache.org/fop/quickstartguide.html)

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
<link
  rel="stylesheet"
  href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
/>
```
