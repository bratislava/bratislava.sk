# Bratislava.sk

This readme should get you up & running. For more detailed documentation, check the /docs file in the root of the repo.

## First-time setup

You need `node` and `yarn` installed locally.

To install dependencies run:

```
yarn
```

For CMS setup see `strapi` directory. Presently you can run this against v3 strapi, either local one or the on running at `https://strapi-homepage.bratislava.sk`

## Run project locally

```
yarn dev
```

## Generate GraphQL

Strapi V4 does not export schema.graphql by default - instead, you'll need a running server to generate types from graphql endpoint. Otherwise the process is the same

```bash
# to update queries or mutations, modify *.graphql files in /graphql/queries directory
# have the strapi server running locally on port 1337 and run the following
yarn gen
```

## Typescript Strict Mode

**TODO this section is not valid _yet_, keeping it in as we'll want to do this in coming days**

We're working on gradually enabling TS strict mode. To achieve this, we're using [typescript-strict-plugin](https://github.com/allegro/typescript-strict-plugin).

It allows for gradual adoption of strict mode. A file that has `// @ts-strict-ignore` at the top of the file, will not be checked with TS strict.

It is recommended to:

1. If you work on a file, remove `// @ts-strict-ignore` and fix the TS errors
2. If you create a new file, don't add `// @ts-strict-ignore`

Available commands:

- `nx run next-city-gallery:typecheck` will check whole project for strict errors
- `nx run next-city-gallery:update-strict-comments` will check all files for existing errors and it will add `// @ts-strict-ignore` to suppress the strict errors. Should be used only as a last resort.

### VSCode support

VSCode supports this plugin out of the box. However, sometimes it can use its own typescript version instead of the project one, resulting in not reading the local tsconfig. If you are using VSCode be sure to have `Use workspace version` option selected in `Typescript: Select Typescript Version...` command available in the [command pallete](https://code.visualstudio.com/docs/getstarted/userinterface#_command-palette).

<img width="729" alt="image" src="https://user-images.githubusercontent.com/35625949/153884371-e0f488d4-05b8-4b88-93d2-1caa7e6081f7.png">
