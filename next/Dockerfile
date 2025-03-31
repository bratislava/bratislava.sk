FROM node:20.19-alpine AS base
ENV NEXT_TELEMETRY_DISABLED=1

FROM base AS install
WORKDIR /build
COPY ./package.json package-lock.json ./
ENV NPM_CONFIG_CACHE=/build/.cache/npm
RUN --mount=type=cache,target=/build/.cache/npm \
    npm clean-install --include=dev

FROM install AS build
COPY . ./
RUN --mount=type=cache,target=/build/.cache/npm \
    npm run build \
 && npm prune --production

FROM base AS app-base
RUN apk add --update --no-cache tini
RUN mkdir -p /home/node/app \
 && chown node:node /home/node/app
USER node
WORKDIR /home/node/app
ENV NODE_ENV=production
EXPOSE 3000
ARG GIT_COMMIT="undefined"
ENV GIT_COMMIT=$GIT_COMMIT
LABEL org.opencontainers.image.revision="${GIT_COMMIT}" \
      org.opencontainers.image.source="https://github.com/bratislava/bratislava.sk" \
      org.opencontainers.image.licenses="EUPL-1.2"
ENTRYPOINT [ "/sbin/tini", "--" ]

FROM app-base AS dev
ENV NODE_ENV=development
COPY --chown=node:node --from=install /build/node_modules ./node_modules
CMD [ "npm", "run", "develop" ]

FROM app-base AS prod
COPY --chown=node:node .env.*.local ./
COPY --chown=node:node --from=build /build/.next/standalone ./
COPY --chown=node:node --from=build /build/public ./public
COPY --chown=node:node --from=build /build/.next/static ./.next/static
CMD [ "node", "server.js" ]
