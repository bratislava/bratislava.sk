# 🚀 Getting started with Strapi

Strapi comes with a full featured [Command Line Interface](https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html) (CLI) which lets you scaffold and manage your project in seconds.

## 🧰 Setup

You need postgres running locally (with correct credentials & databse available). The default setup is below, you can override any of the variables by passing them in you `.env` file. The easiest way to get a postgres db with the right credentials up&running is via `docker-compose.yml` file in the root fo this repo (check the root README).

```
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=postgres4
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=password
DATABASE_SCHEMA=public
```

Before you start, install all dependencies using by running

```
yarn
```

### `develop`

Start your Strapi application with autoReload enabled. [Learn more](https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html#strapi-develop)

```
yarn develop
```

### `start`

Start your Strapi application with autoReload disabled. [Learn more](https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html#strapi-start)

```
yarn start
```

### `build`

Build your admin panel. [Learn more](https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html#strapi-build)

```
yarn build
```

## Secrets
Let's have a look if you are in the proper cluster:

```bash
kubectl config current-context
```

We are using for secrets `Sealed Secrets` https://github.com/bitnami-labs/sealed-secrets.
To use a secret in your project, you have to install `kubeseal` if you haven`t installed it yet.

```bash
brew install kubeseal
```
The next thing is going to the folder `secrets` where all our secrets are stored:

```bash
cd kubernetes/base/secrets
```

After that, we need to create a temp file for our new secrets. Let's assume we want database connection secretes. You need to make this file `database.yml`

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: database-secret
data:
  POSTGRES_DB: YmFuYW5h
  POSTGRES_USER: YmFuYW5h
  POSTGRES_PASSWORD: YmFuYW5h
```

- `metadata.name` is the name of the group of secrets in our case, `database-secret`

- `data` contains environment variables keys (`POSTGRES_DB`) and base64 encode values (`YmFuYW5h`).

For example, if you need to set up the database name to `banana`, you need to base64 encode this value. You can use an online base64 converter like https://www.base64encode.org and encode `banana` to `YmFuYW5h`.


The last thing is encrypting our secrets by kubeseal to be used on Kubernetes. You need to run this command that creates the file `database.secret.yml` where all our values are encrypted and safe to add to the repository.
```bash
kubeseal --controller-name=sealed-secrets --scope=namespace-wide --namespace=standalone --format=yaml < database.yml > database.secret.yml 
```

If you want to propagate a sealed secret to Kubernetes without a pipeline, you can run this command:
```bash
kubectl create -f database.secret.yml
```

If you already have a sealed secret in Kubernetes, you can update it with the command:
```bash
kubectl apply -f database.secret.yml
```
Usually, you get this kind of error: `Error from server (AlreadyExists): error when creating "database.secret.yml": sealedsecrets.bitnami.com "nest-Prisma-template-database-secret" already exists`

If you want to check if your secret is there, you can run this command:
```bash
kubectl get secret --namespace=standalone nest-prisma-template-database-secret
```
To implement on-demand revalidation, we need to add webhook url from strapi admin panel. The route of the url should be like below:
```
https://<host>/api/revalidate?secret=<STRAPI_REVALIDATE_SECRET_TOKEN>
```