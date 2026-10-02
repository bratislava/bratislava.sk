# bratislava.sk

This project is led by the [Department of Innovation and Technology of the City of Bratislava](https://inovacie.bratislava.sk). We’re making it entirely open-source as we believe this promotes [savings, collaboration, auditability and innovation](https://publiccode.eu) in the public sector.

Our goal is to be transparent about services we’re developing and providing, as well as to invite other cities and municipalities to build on top of the same or similar open-source technologies we’ve already tested and used - to foster an ecosystem of collaboration between teams facing similar challenges.

## What's here

Each sub-project contains README which should get you up and running. More documentation can be (eventually) found [here](https://bratislava.github.io).

🏡 `/next` bratislava.sk Nextjs web app

🗄️ `/strapi` Strapi CMS server for bratislava.sk — for connecting to / dumping the deployed database, see [`strapi/README.md`](./strapi/README.md#connecting-to-the-deployed-database-staging--dev--prod)

📝 `/docs` contain the mapping between React and Strapi components - to be replaced by a styleguide in the future

---

🐳 `docker-compose.yml` - if you need to quickly setup postgres or meilisearch instance, run `docker compose up` (or `docker compose up postgres`, `docker compose up meilisearch`) in this directory (you need docker installed)

- in case of using `podman` use command `docker-compose up postgres`

## Local installation

Follow the user guide in folders `/strapi` and `/next`. In both of them the local dev setup is `cp .env.example .env.local`.

`REVALIDATE_SECRET_TOKEN` can be any string, it just has to be the same in `strapi/.env.local` and `next/.env.local` - Strapi uses it to authorize its revalidation requests to Next.

### Meilisearch

After initial `docker compose up` you have to set keys for meilisearch for both the Strapi and Next. To get them, run the command below:

```
curl --request GET \
  --url http://localhost:7700/keys \
  --header 'Authorization: Bearer masterKey' \
  --header 'Content-Type: application/json' | json_pp
```

Then use "Default Admin API Key" for strapi in `strapi/.env.local` as `MEILISEARCH_ADMIN_API_KEY` and "Default Search API Key" in `next/.env.local` file as `NEXT_PUBLIC_MEILISEARCH_SEARCH_API_KEY`.

## Deployment

### How deploys work

Deploys are triggered by pushing a tag, or by a push to `master`:

| Ref                                              | Cluster       | Services    |
| ------------------------------------------------ | ------------- | ----------- |
| push to `master`                                 | `staging`     | both        |
| `dev*` (e.g. `dev1.2.3`)                         | `development` | both        |
| `staging*`                                       | `staging`     | both        |
| `prod*`                                          | `production`  | both        |
| `dev-next*`, `staging-next*`, `prod-next*`       | as above      | Next only   |
| `dev-strapi*`, `staging-strapi*`, `prod-strapi*` | as above      | Strapi only |

`deploy.yml` resolves the cluster and the services in scope, then builds each in-scope
service image and tags it `<cluster>-<short-sha>` in Harbor
(`harbor.bratislava.sk/standalone/bratislava-next`, `.../bratislava-strapi`). Strapi is built
and deployed first; Next is only _built_ after that, because `next build` prerenders
pages against the live Strapi of the target cluster and fails on a schema it does not
know yet. The same build workflows run on pull requests in build-only mode, so a PR
fails on anything that would break the deploy build. The PR Next build bakes in the
`development` environment and prerenders against the live dev Strapi, so a PR that
changes the Strapi schema in a way Next depends on should first deploy its Strapi to dev
(push a `dev-strapi*` tag from the branch) for that check to pass.

Strapi's image is environment-agnostic, so one per-commit build is reused across clusters.
Next bakes its environment into the build, so it is rebuilt per cluster with its own Docker
cache and a `-<cluster>` tag suffix.

Once an image exists, the matching `deploy-*` job calls the shared
`trigger-infra-deploy.yml`, which dispatches a deploy in
[infrastructure-deployment-configuration](https://github.com/bratislava/infrastructure-deployment-configuration).
That applies the Terragrunt unit for the service under
`clusters/<cluster>/applications/bratislava.sk/<service>` and waits for the rollout.

Build and deploy plumbing (Buildx setup, registry logins, Docker tag and cache metadata,
image reuse checks, the infra deploy trigger) comes from shared actions in
[bratislava/github-actions](https://github.com/bratislava/github-actions).

### Environment variables and secrets

Runtime configuration is split in two: **non-secret env vars live in this repo**, next to
the code they configure, and **secrets live in Passbolt**. The deployment itself is defined
per cluster in the infrastructure repo, under
`clusters/<cluster>/applications/bratislava.sk/<service>` (clusters: `development`,
`staging`, `production`).

**Non-secret env vars** go in `<service>/.env.deploy.<cluster>`, e.g.
`strapi/.env.deploy.staging`. On deploy the infrastructure repo reads that file from the
exact commit being deployed and turns it into the `<service>-env` config map. The format
is: one `KEY=VALUE` per line, blank lines and whole-line `#` comments ignored, and one
surrounding pair of either `'` or `"` stripped if present. **A value has to fit on a single
line** — there is no line continuation and no escape processing, so a `#` mid-line stays
part of the value. Anything multiline must either be rewritten to a single line or land in
Passbolt.

**Next build-time variables** are separate: `NEXT_PUBLIC_*` values are baked into the
bundle at build time and come from `next/.env.build.<cluster>`, which is committed here.
Only public values belong in those files — they ship to the browser. The server-only
values in them (`GINIS_HOST_UDE`, `CITY_ACCOUNT_*`, `MSAL_CLIENT_ID`, `MSAL_SCOPE`,
`MSAL_TENANT_ID`) are needed while prerendering, and are repeated in
`next/.env.deploy.<cluster>`, which is what the running pod uses — change both.

**Secrets** live in [Passbolt](https://passbolt.bratislava.sk) and are synced into the
cluster by External Secrets Operator, so you need Passbolt access to change them. Passbolt
resources are named `<cluster>/<service>/<ENV_VAR_NAME>` and sync into that service's
`<service>-secret` Kubernetes Secret:

- `bratislava-next`: `MSAL_CLIENT_SECRET`, `STARZ_ECOMAIL_API_KEY`, `NALGOO_API_KEY`,
  `CONTENT_INVENTORY_API_KEY`, `GINIS_USERNAME`, `GINIS_PASSWORD`, `REVALIDATE_SECRET_TOKEN`
- `bratislava-strapi`: `APP_KEYS`, `ADMIN_JWT_SECRET`, `API_TOKEN_SALT`, `JWT_SECRET`,
  `MAILGUN_API_KEY`, `MINIO_ACCESS_KEY`, `MINIO_SECRET_KEY`, `REVALIDATE_SECRET_TOKEN`
- `bratislava-strapi-meilisearch`: `MEILI_MASTER_KEY`

Every secret belongs to exactly one service — a value both services need (here
`REVALIDATE_SECRET_TOKEN`) is stored once per service rather than in a shared group.
Updating a value in Passbolt is enough; it syncs to the cluster on the next deploy. The
same goes for new secret env vars, as long as they are named under an existing service.

Database credentials are not in Passbolt: Strapi uses the shared `strapi-cnpg` Postgres
cluster, and Terraform writes its `DATABASE_HOST`, `DATABASE_PORT`, `DATABASE_NAME`,
`DATABASE_USERNAME`, `DATABASE_PASSWORD` and `DATABASE_CLIENT` straight into the
`strapi-cnpg-bratislava-credentials` secret. Credentials Terraform generates are published
_into_ Passbolt as `read-only/<cluster>/<service>/<ENV_VAR_NAME>` — a read-only mirror so
the team can look values up. The `read-only/` prefix is what stops External Secrets from
syncing them back, and editing them there does nothing, as the next apply reverts it.

Meilisearch's connection details (host and admin API key) are stored in Strapi's own
database and configured through the Strapi admin UI, not through Kubernetes config.

If you aren't sure where a variable belongs, ask the maintainers of the infrastructure
repo.

## Acknowledgments

This project utilizes the [iframe-resizer](https://github.com/davidjbradshaw/iframe-resizer) library, which is an open-source project developed by [David J. Bradshaw](https://github.com/davidjbradshaw). We are grateful for the work that has been put into this library and its contribution to the open-source community.
