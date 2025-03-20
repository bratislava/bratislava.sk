# 🚀 Strapi

## Setup

Before you start, install all dependencies and create `.env.local` file which is .gitignored and used for local dev.

```
yarn
cp .env.example .env.local
```

You need postgres running locally (with correct credentials & database available). The easiest way to get a postgres db with the right credentials up&running is via `docker-compose.yml` file. Check the readme in the root of this repo.

## Build

Build your admin panel. [Learn more](https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html#strapi-build)

```
yarn build
```

## Start development server

Start your Strapi application with autoReload enabled. [Learn more](https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html#strapi-develop)

```
yarn dev
```

## Start server

Start your Strapi application with autoReload disabled (not needed for development). [Learn more](https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html#strapi-start)

```
yarn start
```

## Set permissions

To allow graphql queries, you need to give access to Public role:

Open Strapi admin panel, go to Settings > USERS & PERMISSIONS PLUGIN > Roles > Public. Check `find` and `findOne` for all content types.

## Using `patch-package`

We use `patch-package` to apply patches to dependencies.

### @strapi/admin
> Note: The text below applies for newer versions of Strapi, but I'm keeping it here for future us when we upgrade Strapi.\
> For v4.10.8, you can find DynamicComponent.js in node_modules directly.

Strapi transpiled files are located in `./node_modules/@strapi/[package-name]/dist/_chunks` so it's needed to make the changes and run patch-package on every Strapi upgrade.

We change the default state of Dynamic Zone accordions to closed (see original file [DynamicComponent.tsx](https://github.com/strapi/strapi/blob/11c0ef3bd0937cb32dd5da01e346090d8702dd0b/packages/core/admin/admin/src/content-manager/components/DynamicZone/DynamicComponent.tsx#L57)).
Since the .js files do not have the same structure and names as the .tsx files, we found the proper file by searching for the string from the original file, e.g. `"const [isOpen, setIsOpen] = React.useState(true);"`
and then run the command to create a patch file:
```bash
yarn patch-package @strapi/admin
```
