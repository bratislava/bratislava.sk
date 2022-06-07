# Bratislava city-gallery website

## First-time setup

You need to set up correct permissions in the strapi instance after creating it. The goal is to allow reading all of the data with an unauthenticated user. You need strapi running to change these settings. First run needs to happen with the `--clean` flag, otherwise the admin won't build.

```
nx serve strapi-city-gallery --clean
```

To set the permissions, go to Settings -> Users & Permissions Plugin -> Roles -> Public -> Permissions section, and make sure the Public role has find / findone / count rights on everything like so:

![](../../../docs/assets/strapi-permissions.png)

## Run project locally

Before you run the commands below, you need to be in the root folder of the repository. Otherwise, you will get this lovely error:

`ENOENT: no such file or directory, stat 'apps/next/city-gallery/tsconfig.json'`

Commands for a run from root:

```
nx serve next-city-gallery
nx serve strapi-city-gallery
```

## Adding new routes

In order to have routes multilingual (for example, to have both `/navstivte` and `/en/visit-us`) you need to make following steps when adding a route:

1. Add a new page in Slovak (as usual), for example `navstivte.tsx`

2. Add a rewrite to next.config.js, to map the the English route to the existing page, like this:

```
async rewrites() {
  return {
    beforeFiles: [
    ...
      {
        source: '/visit-us',
        destination: '/navstivte',
      },
      ...
    ],
  };
}
```

3. Add an entry to the Slovak to English map of routes in `localeRoutes.ts`

4. Use `getRouteForLocale` when using the `<Link>` component, like this: `<NavLink url={getRouteForLocale('/navstivte', i18n.language)}>`. You need to pass the route in Slovak and the current locale. This will correctly resolve the route for the given locale.

## Typescript Strict Mode

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

## Strapi SDK for city-gallery

Refer to [the documentation](/docs/libs/Strapi-SDK.md).

To generate new types:

```
yarn gen
```
