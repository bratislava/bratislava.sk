# 🚀 Strapi

## Setup

Before you start, install all dependencies and create `.env.local` file which is .gitignored and used for local dev.

```
nom install
cp .env.example .env.local
```

You need postgres running locally (with correct credentials & database available). The easiest way to get a postgres db with the right credentials up&running is via `docker-compose.yml` file. Check the readme in the root of this repo.

## Build

Build your admin panel. [Learn more](https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html#strapi-build)

```
npm run build
```

## Start development server

Start your Strapi application with autoReload enabled. [Learn more](https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html#strapi-develop)

```
npm run dev
```

## Start server

Start your Strapi application with autoReload disabled (not needed for development). [Learn more](https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html#strapi-start)

```
npm run start
```

## Set permissions

To allow graphql queries, you need to give access to Public role:

Open Strapi admin panel, go to Settings > USERS & PERMISSIONS PLUGIN > Roles > Public. Check `find` and `findOne` for all content types.

## Using `patch-package`

We use `patch-package` to apply patches to dependencies.

Note: Strapi transpiled files are located in `./node_modules/@strapi/[package-name]`

### @strapi/content-manager

We change Wysiwyg editor image inserting so it inserts also image title (caption), so we can display it on FE.

```bash
npx patch-package @strapi/content-manager
```

### @strapi/typescript-utils

Patching until this issue is fixed: https://github.com/strapi/strapi/issues/24093

We add `'en'` locale to `.localCompare()` function so properties order in generated files does not depend on the machine's language.

```bash
npx patch-package @strapi/typescript-utils
```

## Pages by Component

We add a custom admin page `PagesByComponent.tsx` that lists which pages use which section components. This feature uses a custom api route defined in `api/pages-by-component`.
