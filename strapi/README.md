# 🚀 Strapi

## Setup

Before you start, install all dependencies and create `.env.local` file which is .gitignored and used for local dev.

```
nom install
cp .env.example .env.local
```

You need postgres running locally (with correct credentials & database available). The easiest way to get a postgres db with the right credentials up&running is via `docker-compose.yml` file. Check the readme in the root of this repo.

## Connecting to the deployed database (staging / dev / prod)

The deployed Strapi stores its data in an on-cluster [CloudNativePG (CNPG)](https://cloudnative-pg.io/) Postgres. Unlike a per-app DB, this uses a **shared** CNPG cluster `strapi-cnpg` in the `standalone` namespace that hosts one database per Bratislava Strapi backend (`bratislava`, `city-foundation`, `city-gallery`, `city-library`, `general`, `marianum`, `olo`). This repo's database is **`bratislava`**.

The three clusters (`development`, `staging`, `production`) are laid out identically, so the steps below are the same for every environment — you only switch the kube context. Examples use **staging**.

### 1. Log in to the cluster

Kube context / login is handled by the [`k8-helpers`](https://github.com/bratislava/k8-helpers) aliases:

```bash
k8stage   # staging   (use k8dev / k8prod for the other clusters)
```

### 2. Read the database credentials

Each web's credentials live in a `strapi-cnpg-<web>-credentials` secret in the `standalone` namespace — for this repo, `strapi-cnpg-bratislava-credentials`:

```bash
NS=standalone
kubectl get secret strapi-cnpg-bratislava-credentials -n $NS -o jsonpath='{.data.DATABASE_USERNAME}' | base64 -d; echo
kubectl get secret strapi-cnpg-bratislava-credentials -n $NS -o jsonpath='{.data.DATABASE_NAME}'     | base64 -d; echo
kubectl get secret strapi-cnpg-bratislava-credentials -n $NS -o jsonpath='{.data.DATABASE_PASSWORD}' | base64 -d; echo
```

### 3. Connect

Port-forward the shared cluster's read-write service to a local port. Use **5433** so it doesn't clash with the local docker Postgres on 5432:

```bash
kubectl port-forward -n standalone svc/strapi-cnpg-rw 5433:5432
# then, in another shell (user / db / password from step 2):
PGPASSWORD=<password> psql -h localhost -p 5433 -U <user> -d <db>
```

### 4. Dump it and restore locally

```bash
# dump (custom format) while the port-forward from step 3 is running
PGPASSWORD=<password> pg_dump -h localhost -p 5433 -U <user> -d <db> -Fc -f strapi-staging.dump

# start a local Postgres (see root readme): docker compose up postgres
# restore into it (creds/db from your .env.local, default port 5432)
PGPASSWORD=<local_password> pg_restore --clean --no-owner \
  -h localhost -p 5432 -U <local_user> -d <local_db> strapi-staging.dump
```

> **Note:** `strapi-cnpg` is shared — only ever dump the `bratislava` database, and never write to another web's database. Treat **production** dumps as sensitive.

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

### @strapi/database

Fixes repeatable component / dynamic zone ordering in GraphQL responses. The GraphQL component field resolver injects an empty `orderBy: []` into the populate query. In `getJoinTableOrderBy` (`query/helpers/populate/apply.js`) the check `if (populateValue.orderBy || ...)` treats that empty array as truthy, so the join-table `order` column is dropped and components fall back to natural primary-key (`id`) order instead of the order set in the admin. REST is unaffected. The patch treats an empty array as "no explicit sort".

```bash
npx patch-package @strapi/database
```

## Pages by Component

We add a custom admin page `PagesByComponent.tsx` that lists which pages use which section components. This feature uses a custom api route defined in `api/pages-by-component`.
