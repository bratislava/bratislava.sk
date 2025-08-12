# Bratislava.sk

This readme should get you up & running.

## First-time setup

You need `node` and `npm` installed locally.

To install dependencies run:

```
npm install
```

For CMS setup see `strapi` directory. You can also run the project against production strapi - this is the default setup. If you want to run against local strapi, you need to set `NEXT_PUBLIC_STRAPI_URL` in `.env.local` file.

## Run project locally

```
npm run dev
```

By default this connects you to the production Strapi instance - this is all you need for much of the FE development or bugfixes. If you need to edit anything on the side of Strapi, it's still recommended that you start from seeded data instead of an empty database - read more in the `../strapi/README.md` or the [relevant docs](https://bratislava.github.io/docs/recipes/load-strapi-db-in-local-dev).

## Meilisearch

We're using [Meilisearch](https://www.meilisearch.com/) as our search engine - for search to work, Next & Strapi needs to connect to a running meilisearch instance. You can develop most of the page without this, but if you need to work with search follow [the guide on our docs page](https://bratislava.github.io/docs/bratislava.sk/meilisearch-setup).

You can also setup local meilisearch instance using `docker compose` - see `docker-compose.yml` in the root of the repo and set your `.env.development.local` vars accordingly.

## Generate GraphQL

To update queries or mutations, modify `*.graphql` files in `/services/graphql/queries` directory.
The Schema is exported but the codegen is set up to run against running Strapi instance to generate types from
graphql endpoint, simply run:

```bash
# expects strapi running locally on port 1337
npm run gen
```

## Notes

### How to run local scripts

You can run a local script using `ts-node`. Scripts are located in `scripts/` folder. Development only scripts (those that are run from locale machine) are located in `scripts/dev/` subfolder.

To run a script outside Next.js environment, we have to add `dotenv` support for reading .env files (e.g. `dotenv.config({ path: '.env.local' })`), and run scripts together with `tsconfig-paths/register` to resolve path aliases (`@/*`):

```
ts-node -r tsconfig-paths/register scripts/.../nameOfYourScript.ts
```

### Next API endpoints and server-side functions

Some external services, such as Active Directory or GINIS, must be called only from server for security reasons
or because they are available only from the internal network. For this purpose, we use Next API endpoints.
The endpoints should call a function, that wraps the data-fetching from the external service.

These functions are grouped usually in `server` subdirectory of a specific service (e.g. `ginis/server`) to indicate that they are called only from server.

Use Next API endpoints only if needed for mentioned reasons. Otherwise, fetch data directly from client.

### Resources

There is one resource that needs to be available in https://bratislava.sk/Img/bratislava4.png, it is used in mails in signature as logo. Therefore please don't erase `public/Img/bratislava4.png`.
