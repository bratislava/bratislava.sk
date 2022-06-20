FROM node:16 as dev

RUN mkdir -p /usr/src/app
ENV PORT 3000

WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY yarn.lock /usr/src/app

RUN yarn install

COPY . /usr/src/app

RUN yarn build

EXPOSE 3000
CMD [ "yarn", "develop" ]


FROM node:16-alpine as prod

USER node
ENV PORT 3000

RUN mkdir -p /home/node/app && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY --chown=node:node package*.json ./
COPY --chown=node:node ./yarn.lock ./

RUN yarn install --production

COPY . ./

RUN yarn build

EXPOSE 3000
CMD [ "yarn", "start" ]